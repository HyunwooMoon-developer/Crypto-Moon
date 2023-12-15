import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { buy, getPocket, reset, sell } from '../../redux/tradeSlice';
import { balanceUpdate } from '../../redux/authSlice';

const labelStyle =
  'inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700';

const Trade = ({ coin }: { coin: any }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.auth
  );
  const {
    pocket,
    isLoading: tradeLoading,
    isError,
    message,
  } = useAppSelector((state) => state.trade);

  const [coinTotal, setCoinTotal] = useState<number>(0);
  const [trade, setTrade] = useState<'buy' | 'sell'>('buy');
  const [buyAmount, setBuyAmount] = useState<string | number>(0);
  const [sellAmount, setSellAmount] = useState<string | number>(0);

  const handleTradeType = (type: 'buy' | 'sell') => {
    setTrade(type);
  };

  const handleBuyAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyAmount(e.target.value);
    setSellAmount(0);
  };

  const handleSellAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellAmount(e.target.value);
    setBuyAmount(0);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(reset());

    if (trade === 'buy') {
      await dispatch(
        buy({
          coinID: coin.id,
          amount:
            typeof buyAmount === 'string' ? parseInt(buyAmount) : buyAmount,
          price: coin.price,
        })
      );
    }

    if (trade === 'sell') {
      await dispatch(
        sell({
          coinID: coin.id,
          amount:
            typeof sellAmount === 'string' ? parseInt(sellAmount) : sellAmount,
          price: coin.price,
        })
      );
    }

    dispatch(balanceUpdate());

    setBuyAmount(0);
    setSellAmount(0);
  };

  useEffect(() => {
    if (!tradeLoading && pocket.length > 0) {
      const item = pocket.find((item) => item.coinID === coin.id);

      if (item) {
        setCoinTotal(item.amount);
      } else {
        setCoinTotal(0);
      }
    } else if (!tradeLoading && pocket.length === 0) {
      setCoinTotal(0);
    }
  }, [pocket, tradeLoading, coin.id]);

  useEffect(() => {
    if (isError) toast.error(message);

    if (!user) {
      navigate('/login');
    }

    dispatch(getPocket());
  }, [user, dispatch, navigate, isError, message]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between border shadow w-[30%] max-lg:w-full rounded-lg dark:bg-gray-900 dark:border-gray-900"
    >
      <div>
        <div className="font-bold text-xl border-b dark:border-gray-700 text-center p-2 pt-5">
          Make a trade
        </div>
        <div>
          <ul className="grid w-full gap-2 grid-cols-2 p-2">
            <li>
              <input
                type="radio"
                id="trade-buy"
                className="hidden peer"
                name="hosting"
                checked={trade === 'buy'}
                value="buy"
                onChange={() => handleTradeType('buy')}
              />
              <label htmlFor="trade-buy" className={labelStyle}>
                <div className="block">
                  <div className="w-full text-lg font-semibold">Buy</div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="trade-sell"
                className="hidden peer"
                name="hosting"
                checked={trade === 'sell'}
                value="sell"
                onChange={() => handleTradeType('sell')}
              />
              <label htmlFor="trade-sell" className={labelStyle}>
                <div className="block">
                  <div className="w-full text-lg font-semibold">Sell</div>
                </div>
              </label>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between p-3 text-sm font-medium text-gray-900 dark:text-white">
          <span>Total Balance</span>
          <span>
            {userLoading ? (
              <div className="flex items-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
                Updating Balance
              </div>
            ) : (
              `$${user?.balance ? user.balance.toFixed(2) : ''}`
            )}
          </span>
        </div>
        <div className="flex items-center justify-between px-3 pb-3 text-sm font-medium text-gray-900 dark:text-white">
          <span>{coin.name} Owned</span>
          <span>{coinTotal}</span>
        </div>
        <div className="px-3 pb-3">
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            min={1}
            max={trade === 'sell' ? coinTotal : undefined}
            name="amount"
            value={trade === 'buy' ? buyAmount : sellAmount}
            onChange={trade === 'buy' ? handleBuyAmount : handleSellAmount}
            placeholder="Amount"
            autoComplete="off"
            required
          />
        </div>
      </div>
      <div className="p-3">
        {!tradeLoading ? (
          <button
            type="submit"
            className="text-white w-full bg-primary hover:shadow-inner focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mr-2 mb-2 dark:bg-primary focus:outline-none dark:focus:ring-primary py-2.5"
          >
            {trade === 'buy' ? 'Buy' : 'Sell'}
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="text-white w-full bg-primary hover:shadow-inner focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mr-2 mb-2 dark:bg-primary focus:outline-none dark:focus:ring-primary py-2.5"
          >
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default Trade;
