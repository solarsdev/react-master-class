import { useQuery } from 'react-query';
import { getCoinHistorical } from '../api';
import ChartProps from '../interfaces/ChartProps';
import { GetCoinHistorical } from '../interfaces/GetCoinHistorical';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { themeNameAtom } from '../atoms';

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data: historicals } = useQuery<GetCoinHistorical[]>(
    ['getCoinHistorical', coinId],
    () => getCoinHistorical(coinId),
  );
  const themeName = useRecoilValue(themeNameAtom);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ApexChart
      type='candlestick'
      series={[
        {
          data: historicals?.map((historicalData) => {
            return [
              new Date(historicalData.time_close).getTime(),
              [
                historicalData.open,
                historicalData.high.toFixed(3),
                historicalData.low.toFixed(3),
                historicalData.close.toFixed(3),
              ],
            ];
          }),
        },
      ]}
      options={{
        chart: {
          width: 500,
          height: 500,
          zoom: { enabled: false },
          background: 'transparent',
        },
        theme: {
          mode: themeName === 'light' ? 'light' : 'dark',
        },
        grid: {
          show: false,
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return new Date(value).toUTCString().slice(5, 11);
            },
          },
        },
      }}
    />
  );
};

export default Chart;
