import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  display: flex;
  align-items: center;

  padding: 20px;
  margin: 20px 0px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};

  transition: color 0.15s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: ${(props) => props.theme.h1Size};
`;

interface CoinsInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<CoinsInterface[]>([]);

  useEffect(() => {
    (async () => {
      const coinsData = await (await fetch('https://api.coinpaprika.com/v1/coins')).json();
      setCoins(coinsData.slice(0, 50));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Crypto Tracker</Title>
      </Header>
      <CoinsList>
        {loading
          ? 'Loading...'
          : coins.map((coin) => (
              <Link key={coin.id} to={`/${coin.id}`} state={{ name: coin.name }}>
                <Coin>
                  <img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt={coin.name}
                  />
                  {coin.name} &rarr;
                </Coin>
              </Link>
            ))}
      </CoinsList>
    </Container>
  );
};

export default Coins;
