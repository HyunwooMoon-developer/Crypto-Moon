import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getCoins, searchCoin } from '../services/apis';
import Search from '../components/UI/Search';
import Skeleton from '../components/UI/Skeleton';
import CoinTable from '../components/CoinTable';
import { getPocket } from '../redux/tradeSlice';
import Pagination from '../components/UI/Pagination';
import { CoinType } from '../types/types';

const coinsPerPage: number = 10;

const Home = ({ theme, toggle }: { theme: string; toggle: () => void }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { pocket, isLoading: tradeLoading } = useAppSelector(
    (state) => state.trade
  );

  const [coinTotal, setCoinTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [markets, setMarkets] = useState<CoinType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string[]>([]);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const currentCoins = markets.slice(
    indexOfLastCoin - coinsPerPage,
    indexOfLastCoin
  );

  const paginate = (page: number) => setCurrentPage(page);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const data = (await getCoins()) as CoinType[];

        setMarkets(data);
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
    };

    getCoinsData();
  }, []);

  useEffect(() => {
    if (!tradeLoading && pocket.length > 0) {
      const coinAmounts = pocket.map((item) => item.amount);

      const total = coinAmounts.reduce((a, b) => {
        return a + b;
      }, 0);

      setCoinTotal(total);
    } else if (!tradeLoading && pocket.length === 0) {
      setCoinTotal(0);
    }
  }, [tradeLoading, pocket]);

  useEffect(() => {
    const searchCoinData = async () => {
      if (searchInput.length > 0) {
        try {
          const data = await searchCoin(searchInput);

          setSearch(data);
        } catch (err) {
          setError(err);
        }
      } else {
        setSearch([]);
      }
    };

    searchCoinData();
  }, [searchInput]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getPocket());
  }, [user, navigate, dispatch]);

  return (
    <React.Fragment>
      <div className="flex items-center justify-between flex-wrap max-xl:mt-2">
        <div className="dark:text-gray-300">
          Welcome Back, {user?.fname ?? 'Unknown'}
        </div>
        <div className="flex items-center justify-between max-sm:w-full gap-3 max-sm:mt-2">
          <div>
            <input
              type="search"
              id="search"
              className="search"
              placeholder="Search"
              autoComplete="off"
              required
              onChange={handleSearch}
            />
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={
                theme === 'Dark' || localStorage.getItem('tradeTheme') === null
              }
              onChange={toggle}
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-primary peer-checked:bg-primary" />
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {theme} Mode
            </span>
          </label>
        </div>
      </div>

      {search.length === 0 ? (
        <div className="mt-8">
          <div className="flex gap-8 max-md:flex-wrap">
            {!tradeLoading ? (
              <div className="rounded-lg h-64 max-md:w-full w-8/12 bg-white dark:bg- dark:text-gray-400">
                <div className="h-full overflow-y-scroll relative overflow-x-auto shadow-md rounded-lg dark:bg-gray-900">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                      <tr>
                        <th className="px-6 py-3" scope="col">
                          MyCoin
                        </th>
                        <th className="px-6 py-3" scope="col">
                          Price
                        </th>
                        <th className="px-6 py-3" scope="col">
                          Total
                        </th>
                        <th className="px-6 py-3" scope="col">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pocket.length > 0 ? (
                        pocket.map((coin) => (
                          <tr
                            key={coin.coinID}
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 cursor-pointer"
                            onClick={() => navigate(`/${coin.coinID}`)}
                          >
                            <td className="px-6 py-4 flex items-center gap-2">
                              <img
                                src={coin.image}
                                alt={coin.name}
                                width="40"
                                height="40"
                              />
                              <div>
                                <span className="text-black dark:text-gray-200">
                                  {coin.name}
                                </span>{' '}
                                {coin.symbol}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              ${coin.price / coin.amount}
                            </td>
                            <td className="px-6 py-4">
                              ${coin.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">{coin.amount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <td className="pl-6 py-4">Not Coins Available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <Skeleton />
            )}
            <div className="flex max-md:flex-row flex-col max-md:h-40 h-64 gap-8 max-md:w-full w-4/12">
              <div className="flex items-center justify-between flex-wrap bg-primary text-white rounded-lg max-md:h-40 h-28 max-md:w-full shadow-md p-5">
                <h1 className="text-xl font-bold">Balance</h1>
                <h1 className="text-2xl">
                  ${user ? parseFloat(user.balance.toString()).toFixed(2) : ''}
                </h1>
              </div>
              <div className="flex items-center justify-between flex-wrap bg-primary text-white rounded-lg max-md:h-40 h-28 max-md:w-full shadow-md p-5">
                <h1 className="text-xl font-bold">Coins</h1>
                <h1 className="text-2xl">{coinTotal}</h1>
              </div>
            </div>
          </div>
          <CoinTable
            markets={currentCoins}
            isLoading={isLoading}
            error={error}
          />
          <Pagination
            coinsPerPage={coinsPerPage}
            totalCoins={markets.length}
            paginate={paginate}
          />
        </div>
      ) : (
        <Search search={search} />
      )}
    </React.Fragment>
  );
};

export default Home;
