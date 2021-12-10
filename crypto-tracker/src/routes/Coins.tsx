import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCoins } from '../api';
import { GetCoins } from '../interfaces/GetCoins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

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

const PaletteBtn = styled.div`
  color: ${(props) => props.theme.accentColor};
  font-size: ${(props) => props.theme.h3Size};
  cursor: pointer;
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

const Coins = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const { isLoading, data: coins } = useQuery<GetCoins[]>('getCoins', getCoins);
  return (
    <Container>
      <Header>
        <div></div>
        <Title>Crypto Tracker</Title>
        <PaletteBtn onClick={toggleTheme}>
          <FontAwesomeIcon icon={faPalette} />
        </PaletteBtn>
      </Header>
      <CoinsList>
        {isLoading
          ? 'Loading...'
          : coins?.map((coin) => (
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
