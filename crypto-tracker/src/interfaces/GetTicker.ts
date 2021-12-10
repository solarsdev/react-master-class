// To parse this data:
//
//   import { Convert, PriceInfo } from "./file";
//
//   const priceInfo = Convert.toPriceInfo(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface GetTicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

export interface Quotes {
  USD: Usd;
}

export interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toPriceInfo(json: string): GetTicker {
    return cast(JSON.parse(json), r('PriceInfo'));
  }

  public static priceInfoToJson(value: GetTicker): string {
    return JSON.stringify(uncast(value, r('PriceInfo')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ,
      )} but got ${JSON.stringify(val)}`,
    );
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  PriceInfo: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'symbol', js: 'symbol', typ: '' },
      { json: 'rank', js: 'rank', typ: 0 },
      { json: 'circulating_supply', js: 'circulating_supply', typ: 0 },
      { json: 'total_supply', js: 'total_supply', typ: 0 },
      { json: 'max_supply', js: 'max_supply', typ: 0 },
      { json: 'beta_value', js: 'beta_value', typ: 3.14 },
      { json: 'first_data_at', js: 'first_data_at', typ: Date },
      { json: 'last_updated', js: 'last_updated', typ: Date },
      { json: 'quotes', js: 'quotes', typ: r('Quotes') },
    ],
    false,
  ),
  Quotes: o([{ json: 'USD', js: 'USD', typ: r('Usd') }], false),
  Usd: o(
    [
      { json: 'price', js: 'price', typ: 3.14 },
      { json: 'volume_24h', js: 'volume_24h', typ: 3.14 },
      { json: 'volume_24h_change_24h', js: 'volume_24h_change_24h', typ: 3.14 },
      { json: 'market_cap', js: 'market_cap', typ: 0 },
      { json: 'market_cap_change_24h', js: 'market_cap_change_24h', typ: 3.14 },
      { json: 'percent_change_15m', js: 'percent_change_15m', typ: 3.14 },
      { json: 'percent_change_30m', js: 'percent_change_30m', typ: 3.14 },
      { json: 'percent_change_1h', js: 'percent_change_1h', typ: 3.14 },
      { json: 'percent_change_6h', js: 'percent_change_6h', typ: 3.14 },
      { json: 'percent_change_12h', js: 'percent_change_12h', typ: 3.14 },
      { json: 'percent_change_24h', js: 'percent_change_24h', typ: 3.14 },
      { json: 'percent_change_7d', js: 'percent_change_7d', typ: 3.14 },
      { json: 'percent_change_30d', js: 'percent_change_30d', typ: 3.14 },
      { json: 'percent_change_1y', js: 'percent_change_1y', typ: 3.14 },
      { json: 'ath_price', js: 'ath_price', typ: 3.14 },
      { json: 'ath_date', js: 'ath_date', typ: Date },
      { json: 'percent_from_price_ath', js: 'percent_from_price_ath', typ: 3.14 },
    ],
    false,
  ),
};
