import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getCoinChart } from '../../services/apis';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ id, days }: { id: string; days: string }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [coordinate, setCoordinate] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Price',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const getCoinChartData = async () => {
      const data = await getCoinChart(id, days);

      setCoordinate({
        labels: data.map((d: number[]) => {
          const date = new Date(d[0]);

          return `${date.getDate()} ${date.toLocaleString('default', {
            month: 'short',
          })}`;
        }),
        datasets: [
          {
            label: 'Prices',
            data: data.map((d: any) => d[1]),
            borderColor: 'rgb(144,238,144)',
            backgroundColor: '#5E7FA6',
          },
        ],
      });
      setLoading(false);
    };
    getCoinChartData();
  }, [id, days]);

  if (loading) {
    return (
      <div
        role="status"
        className="w-full h-96 p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
      >
        <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5 h-2.5" />
        <div className="w-48 h-2 mb-1 bg-gray-200 rounded-full dark:bg-gray-700" />
        <div className="flex items-baseline mt-1 space-x-6">
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
          <div className="w-full h-56 bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
          <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700" />
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700" />
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <Line
        data={coordinate}
        width={400}
        className="h-96"
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default CoinChart;
