import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { isConstructSignatureDeclaration } from 'typescript';

import { CoinInfo } from '../interfaces/CoinInfo';
import { PriceInfo } from '../interfaces/PriceInfo';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: ${(props) => props.theme.h1Size};
`;

const Overview = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OverviewItem = styled.div`
  font-size: ${(props) => props.theme.textSize};
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.p`
  color: ${(props) => props.theme.textColor};
  margin: 20px 10px;
`;

interface URLParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Coin = () => {
  const { coinId } = useParams() as URLParams;
  const { state } = useLocation();

  const [loading, setLoading] = useState(true);
  const [coinInfo, setCoinInfo] = useState<CoinInfo>();
  const [priceInfo, setPriceInfo] = useState<PriceInfo>();

  useEffect(() => {
    (async () => {
      const coinData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setCoinInfo(coinData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state?.name : loading ? coinId : coinInfo?.name}</Title>
      </Header>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{coinInfo?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OPEN SOURCE:</span>
              <span>{coinInfo?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinInfo?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
    </Container>
  );
};

export default Coin;
