import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoin } from '../services/apis';
import Spinner from '../components/UI/Spinner';
import Error from '../components/UI/Error';
import CoinChart from '../components/UI/CoinChart';
import Trade from '../components/UI/Trade';

const dayArray: ('1' | '7' | '14' | '21' | '30')[] = [
  '1',
  '7',
  '14',
  '21',
  '30',
];

const Coin = () => {
  const params = useParams();

  const [coin, setCoin] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<'1' | '7' | '14' | '21' | '30'>('7');

  useEffect(() => {
    const getCoinData = async () => {
      try {
        const data = await getCoin(params.id as string);

        setCoin(data);
      } catch (err) {
        setError('API Request failed');
      }

      setLoading(false);
    };

    getCoinData();
  }, [params.id]);

  if (loading) return <Spinner />;

  if (error) return <Error />;

  return (
    <div className="max-xl:mt-4 rounded-lg shadow bg-white dark:bg-gray-700 dark:text-gray-400">
      <div className="flex gap-2 max-lg:flex-wrap p-6 px-4">
        <div className="flex flex-col rounded-lg max-lg:w-full w-[70%]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 p-2">
              <img src={coin.image} alt={coin.name} width="40" height="40" />
              <span>{coin.name}</span>
              <span className="text-gray-400">{coin.symbol}</span>
            </div>
            <div className="p-2">
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Rank #{coin.rank}
              </kbd>
            </div>
          </div>
          <div className="flex items-center justify-between p-5 pb-0 pt-2">
            <div className="text-2xl font-semibold">${coin.price}</div>
            <div>
              <ul className="flex items-center gap-3 font-semibold">
                {dayArray.map((day) => (
                  <li
                    key={day}
                    className={`cursor-pointer ${
                      days === day ? '#A6EC9A' : ''
                    }`}
                    onClick={() => setDays(day)}
                  >
                    {day}D
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <CoinChart id={coin.id} days={days} />
          </div>
        </div>
        <Trade coin={coin} />
      </div>
    </div>
  );
};

export default Coin;
