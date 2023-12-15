import { Link } from 'react-router-dom';

const Pagination = ({
  coinsPerPage,
  totalCoins,
  paginate,
}: {
  coinsPerPage: number;
  totalCoins: number;
  paginate: (num: number) => void;
}) => {
  const pageNums = [];

  for (let i = 1; i < Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNums.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-3">
      <ul className="inline-flex items-center -space-x-px">
        {pageNums.map((num) => (
          <li key={num}>
            <Link
              onClick={() => {
                paginate(num);
              }}
              to=""
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {num}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
