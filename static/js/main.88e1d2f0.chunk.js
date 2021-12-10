(this["webpackJsonpcrypto-tracker"]=this["webpackJsonpcrypto-tracker"]||[]).push([[0],{83:function(e,n,t){"use strict";t.r(n);var c,i,o,r,s,a,l,d,j,h,u,b,x,p,O,m,f,g,v,C,y=t(0),S=t.n(y),w=t(28),z=t.n(w),k=t(15),_=t(18),D=t(9),T=t(19),L=t(4),U=t(7),P="https://api.coinpaprika.com/v1",q=function(){return fetch("".concat(P,"/coins")).then((function(e){return e.json()})).then((function(e){return e.slice(0,50)}))},A=t(23),I=t(24),Q=t(48),N=t.n(Q),E=t(1),M=function(e){var n=e.coinId,t=Object(k.useQuery)(["getCoinHistorical",n],(function(){return function(e){var n=Math.floor((new Date).getTime()/1e3),t=n-1209600,c=n;return fetch("".concat(P,"/coins/").concat(e,"/ohlcv/historical?start=").concat(t,"&end=").concat(c)).then((function(e){return e.json()}))}(n)})),c=t.isLoading,i=t.data,o=Object(U.d)();return c?Object(E.jsx)("div",{children:"Loading..."}):Object(E.jsx)(N.a,{type:"candlestick",series:[{data:null===i||void 0===i?void 0:i.map((function(e){return[new Date(e.time_close).getTime(),[e.open,e.high.toFixed(3),e.low.toFixed(3),e.close.toFixed(3)]]}))}],options:{chart:{width:500,height:500,toolbar:{show:!1},zoom:{enabled:!1},background:"transparent"},theme:{mode:o.themeName},grid:{show:!1},yaxis:{labels:{show:!1}},xaxis:{labels:{formatter:function(e){return new Date(e).toUTCString().slice(5,11)}}}}})},F=U.c.div(c||(c=Object(D.a)(["\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-flow: 1fr;\n"]))),Y=U.c.div(i||(i=Object(D.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))),R=U.c.div(o||(o=Object(D.a)(["\n  padding: 20px;\n  color: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])),(function(e){return e.price&&e.price>=0?e.theme.plusColor:e.theme.minusColor})),B=function(e){var n=e.tickerData;return Object(E.jsxs)(F,{children:[Object(E.jsx)(Y,{children:"1h"}),Object(E.jsx)(Y,{children:"24h"}),Object(E.jsx)(Y,{children:"Week"}),Object(E.jsx)(Y,{children:"Month"}),Object(E.jsxs)(R,{price:null===n||void 0===n?void 0:n.quotes.USD.percent_change_1h,children:[null===n||void 0===n?void 0:n.quotes.USD.percent_change_1h,"%"]}),Object(E.jsxs)(R,{price:null===n||void 0===n?void 0:n.quotes.USD.percent_change_24h,children:[null===n||void 0===n?void 0:n.quotes.USD.percent_change_24h,"%"]}),Object(E.jsxs)(R,{price:null===n||void 0===n?void 0:n.quotes.USD.percent_change_7d,children:[null===n||void 0===n?void 0:n.quotes.USD.percent_change_7d,"%"]}),Object(E.jsxs)(R,{price:null===n||void 0===n?void 0:n.quotes.USD.percent_change_30d,children:[null===n||void 0===n?void 0:n.quotes.USD.percent_change_30d,"%"]})]})},J=U.c.div(r||(r=Object(D.a)(["\n  padding: 0px 20px;\n  max-width: 480px;\n  margin: 0 auto;\n"]))),H=U.c.div(s||(s=Object(D.a)(["\n  height: 15vh;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]))),K=U.c.div(a||(a=Object(D.a)(["\n  color: ",";\n  font-size: ",";\n"])),(function(e){return e.theme.accentColor}),(function(e){return e.theme.h3Size})),W=U.c.div(l||(l=Object(D.a)(["\n  color: ",";\n  font-size: ",";\n  cursor: pointer;\n"])),(function(e){return e.theme.accentColor}),(function(e){return e.theme.h3Size})),X=U.c.h1(d||(d=Object(D.a)(["\n  color: ",";\n  font-size: ",";\n"])),(function(e){return e.theme.accentColor}),(function(e){return e.theme.h1Size})),G=U.c.div(j||(j=Object(D.a)(["\n  padding: 20px;\n  border-radius: 20px;\n  background-color: ",";\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])),(function(e){return e.theme.overviewColor})),V=U.c.div(h||(h=Object(D.a)(["\n  font-size: ",";\n  color: ",";\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"])),(function(e){return e.theme.textSize}),(function(e){return e.theme.textColor})),Z=U.c.p(u||(u=Object(D.a)(["\n  color: ",";\n  margin: 20px 10px;\n"])),(function(e){return e.theme.textColor})),$=U.c.div(b||(b=Object(D.a)(["\n  display: flex;\n  justify-content: space-between;\n  margin: 20px 0px;\n"]))),ee=U.c.div(x||(x=Object(D.a)(["\n  width: 200px;\n  padding: 10px;\n  border-radius: 10px;\n  background-color: ",";\n  color: ",";\n  display: flex;\n  justify-content: center;\n"])),(function(e){return e.theme.overviewColor}),(function(e){var n=e.isActive,t=e.theme,c=t.accentColor,i=t.textColor;return n?c:i})),ne=function(e){var n=e.toggleTheme,t=Object(L.h)().coinId,c=Object(L.e)().state,i=Object(L.f)("/:coinId/chart"),o=Object(L.f)("/:coinId/price"),r=Object(k.useQuery)(["getCoin",t],(function(){return function(e){return fetch("".concat(P,"/coins/").concat(e)).then((function(e){return e.json()}))}(t)})),s=r.isLoading,a=r.data,l=Object(k.useQuery)(["getTicker",t],(function(){return function(e){return fetch("".concat(P,"/tickers/").concat(e)).then((function(e){return e.json()}))}(t)})),d=l.isLoading,j=l.data,h=s||d;return Object(E.jsxs)(J,{children:[Object(E.jsxs)(H,{children:[Object(E.jsx)(T.b,{to:"/",children:Object(E.jsx)(K,{children:Object(E.jsx)(A.a,{icon:I.a})})}),Object(E.jsx)(X,{children:(null===c||void 0===c?void 0:c.name)?null===c||void 0===c?void 0:c.name:h?t:null===a||void 0===a?void 0:a.name}),Object(E.jsx)(W,{onClick:n,children:Object(E.jsx)(A.a,{icon:I.b})})]}),h?"Loading...":Object(E.jsxs)(E.Fragment,{children:[Object(E.jsxs)(G,{children:[Object(E.jsxs)(V,{children:[Object(E.jsx)("span",{children:"RANK:"}),Object(E.jsx)("span",{children:null===a||void 0===a?void 0:a.rank})]}),Object(E.jsxs)(V,{children:[Object(E.jsx)("span",{children:"SYMBOL:"}),Object(E.jsx)("span",{children:null===a||void 0===a?void 0:a.symbol})]}),Object(E.jsxs)(V,{children:[Object(E.jsx)("span",{children:"OPEN SOURCE:"}),Object(E.jsx)("span",{children:(null===a||void 0===a?void 0:a.open_source)?"Yes":"No"})]})]}),Object(E.jsx)(Z,{children:null===a||void 0===a?void 0:a.description}),Object(E.jsxs)(G,{children:[Object(E.jsxs)(V,{children:[Object(E.jsx)("span",{children:"TOTAL SUPPLY:"}),Object(E.jsx)("span",{children:null===j||void 0===j?void 0:j.total_supply})]}),Object(E.jsxs)(V,{children:[Object(E.jsx)("span",{children:"MAX SUPPLY:"}),Object(E.jsx)("span",{children:null===j||void 0===j?void 0:j.max_supply})]})]}),Object(E.jsxs)($,{children:[Object(E.jsx)(T.b,{to:"/".concat(t,"/chart"),children:Object(E.jsx)(ee,{isActive:null!==i,children:"Chart"})}),Object(E.jsx)(T.b,{to:"/".concat(t,"/price"),children:Object(E.jsx)(ee,{isActive:null!==o,children:"Price"})})]}),Object(E.jsxs)(L.c,{children:[Object(E.jsx)(L.a,{path:"chart",element:Object(E.jsx)(M,{coinId:t})}),Object(E.jsx)(L.a,{path:"price",element:Object(E.jsx)(B,{tickerData:j})})]})]})]})},te=U.c.div(p||(p=Object(D.a)(["\n  padding: 0px 20px;\n  max-width: 480px;\n  margin: 0 auto;\n"]))),ce=U.c.div(O||(O=Object(D.a)(["\n  height: 15vh;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]))),ie=U.c.div(m||(m=Object(D.a)(["\n  color: ",";\n  font-size: ",";\n  cursor: pointer;\n"])),(function(e){return e.theme.accentColor}),(function(e){return e.theme.h3Size})),oe=U.c.ul(f||(f=Object(D.a)([""]))),re=U.c.li(g||(g=Object(D.a)(["\n  display: flex;\n  align-items: center;\n\n  padding: 20px;\n  margin: 20px 0px;\n  border-radius: 10px;\n  background-color: ",";\n  color: ",";\n\n  transition: color 0.15s ease-in-out;\n  &:hover {\n    color: ",";\n  }\n  img {\n    width: 35px;\n    height: 35px;\n    margin-right: 10px;\n  }\n"])),(function(e){return e.theme.textColor}),(function(e){return e.theme.bgColor}),(function(e){return e.theme.accentColor})),se=U.c.h1(v||(v=Object(D.a)(["\n  color: ",";\n  font-size: ",";\n"])),(function(e){return e.theme.accentColor}),(function(e){return e.theme.h1Size})),ae=function(e){var n=e.toggleTheme,t=Object(k.useQuery)("getCoins",q),c=t.isLoading,i=t.data;return Object(E.jsxs)(te,{children:[Object(E.jsxs)(ce,{children:[Object(E.jsx)("div",{}),Object(E.jsx)(se,{children:"Crypto Tracker"}),Object(E.jsx)(ie,{onClick:n,children:Object(E.jsx)(A.a,{icon:I.b})})]}),Object(E.jsx)(oe,{children:c?"Loading...":null===i||void 0===i?void 0:i.map((function(e){return Object(E.jsx)(T.b,{to:"/".concat(e.id),state:{name:e.name},children:Object(E.jsxs)(re,{children:[Object(E.jsx)("img",{src:"https://cryptoicon-api.vercel.app/api/icon/".concat(e.symbol.toLowerCase()),alt:e.name}),e.name," \u2192"]})},e.id)}))})]})},le=function(e){var n=e.toggleTheme;return Object(E.jsx)(T.a,{basename:"/react-master-class",children:Object(E.jsxs)(L.c,{children:[Object(E.jsx)(L.a,{path:"/",element:Object(E.jsx)(ae,{toggleTheme:n})}),Object(E.jsx)(L.a,{path:"/:coinId/*",element:Object(E.jsx)(ne,{toggleTheme:n})})]})})},de=t(52),je=t(56),he={themeName:"dark",bgColor:"#14213d",textColor:"#e5e5e5",accentColor:"#fca311",plusColor:"#43A806",minusColor:"#E15241",overviewColor:"rgba(0, 0, 0, 0.7)",h1Size:"48px",h2Size:"36px",h3Size:"24px",textSize:"16px"},ue={themeName:"light",textColor:"#14213d",bgColor:"#e5e5e5",accentColor:"#fca311",plusColor:"#43A806",minusColor:"#E15241",overviewColor:"rgba(255, 255, 255, 0.7)",h1Size:"48px",h2Size:"36px",h3Size:"24px",textSize:"16px"},be=Object(U.b)(C||(C=Object(D.a)(["\n  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Source+Sans+Pro:wght@300;400&display=swap');\n  ","\n  * {\n\t\tbox-sizing: border-box;\n\t}\n\tbody {\n\t\tfont-family: 'Source Sans Pro', sans-serif;\n    background-color: ",";\n    color: ",";\n    font-size: ",";\n\t}\n\ta {\n\t\ttext-decoration: none;\n    color: inherit;\n\t}\n"])),de.a,(function(e){return e.theme.bgColor}),(function(e){return e.theme.textColor}),(function(e){return e.theme.textSize}));var xe=function(){var e=Object(y.useState)("dark"),n=Object(_.a)(e,2),t=n[0],c=n[1];return Object(E.jsxs)(U.a,{theme:"light"===t?ue:he,children:[Object(E.jsx)(be,{}),Object(E.jsx)(le,{toggleTheme:function(){c("light"===t?"dark":"light")}}),Object(E.jsx)(je.ReactQueryDevtools,{initialIsOpen:!1})]})},pe=new k.QueryClient;z.a.render(Object(E.jsx)(S.a.StrictMode,{children:Object(E.jsx)(k.QueryClientProvider,{client:pe,children:Object(E.jsx)(xe,{})})}),document.getElementById("root"))}},[[83,1,2]]]);
//# sourceMappingURL=main.88e1d2f0.chunk.js.map