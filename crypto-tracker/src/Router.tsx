import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

const Router = ({ toggleTheme }: { toggleTheme: () => void }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Coins toggleTheme={toggleTheme} />} />
        <Route path='/:coinId/*' element={<Coin toggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
