import styled from 'styled-components';
import { GetTicker } from '../interfaces/GetTicker';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: 1fr;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Item = styled.div<{ price?: number }>`
  padding: 20px;
  color: ${(props) =>
    props.price && props.price >= 0 ? props.theme.plusColor : props.theme.minusColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Price = ({ tickerData }: { tickerData?: GetTicker }) => {
  return (
    <Container>
      <ItemHeader>1h</ItemHeader>
      <ItemHeader>24h</ItemHeader>
      <ItemHeader>Week</ItemHeader>
      <ItemHeader>Month</ItemHeader>
      <Item price={tickerData?.quotes.USD.percent_change_1h}>
        {tickerData?.quotes.USD.percent_change_1h}%
      </Item>
      <Item price={tickerData?.quotes.USD.percent_change_24h}>
        {tickerData?.quotes.USD.percent_change_24h}%
      </Item>
      <Item price={tickerData?.quotes.USD.percent_change_7d}>
        {tickerData?.quotes.USD.percent_change_7d}%
      </Item>
      <Item price={tickerData?.quotes.USD.percent_change_30d}>
        {tickerData?.quotes.USD.percent_change_30d}%
      </Item>
    </Container>
  );
};

export default Price;
