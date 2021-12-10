import { useQuery } from 'react-query';
import { Routes, Route, useLocation, useParams, Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { getCoin, getTicker } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPalette } from '@fortawesome/free-solid-svg-icons';
import { GetCoin } from '../interfaces/GetCoin';
import { GetTicker } from '../interfaces/GetTicker';
import Chart from './Chart';
import Price from './Price';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackBtn = styled.div`
  color: ${(props) => props.theme.accentColor};
  font-size: ${(props) => props.theme.h3Size};
`;

const PaletteBtn = styled.div`
  color: ${(props) => props.theme.accentColor};
  font-size: ${(props) => props.theme.h3Size};
  cursor: pointer;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: ${(props) => props.theme.h1Size};
`;

const Overview = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.overviewColor};
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

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.overviewColor};
  color: ${({ isActive, theme: { accentColor, textColor } }) =>
    isActive ? accentColor : textColor};
  display: flex;
  justify-content: center;
`;

interface URLParams {
  coinId: string;
}

const Coin = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const { coinId } = useParams() as URLParams;
  const { state } = useLocation();

  const isMatchChart = useMatch('/:coinId/chart');
  const isMatchPrice = useMatch('/:coinId/price');

  const { isLoading: isGetCoinLoading, data: coinData } = useQuery<GetCoin>(
    ['getCoin', coinId],
    () => getCoin(coinId),
  );
  const { isLoading: isGetTickerLoading, data: tickerData } = useQuery<GetTicker>(
    ['getTicker', coinId],
    () => getTicker(coinId),
  );

  const isLoading = isGetCoinLoading || isGetTickerLoading;

  return (
    <Container>
      <Header>
        <Link to={'/'}>
          <BackBtn>
            <FontAwesomeIcon icon={faList} />
          </BackBtn>
        </Link>
        <Title>{state?.name ? state?.name : isLoading ? coinId : coinData?.name}</Title>
        <PaletteBtn onClick={toggleTheme}>
          <FontAwesomeIcon icon={faPalette} />
        </PaletteBtn>
      </Header>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{coinData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{coinData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OPEN SOURCE:</span>
              <span>{coinData?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Link to={`/${coinId}/chart`}>
              <Tab isActive={isMatchChart !== null}>Chart</Tab>
            </Link>
            <Link to={`/${coinId}/price`}>
              <Tab isActive={isMatchPrice !== null}>Price</Tab>
            </Link>
          </Tabs>
          <Routes>
            <Route path='chart' element={<Chart coinId={coinId} />} />
            <Route path='price' element={<Price tickerData={tickerData} />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;
