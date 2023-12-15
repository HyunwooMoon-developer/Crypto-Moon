import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, reset } from '../../redux/authSlice';

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className="max-xl:block hidden bg-gray-50 border border-gray-200 px-2 sm:px-4 py-2.5 rounded-lg dark:bg-gray-900 dark:border-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link className="flex items-center" to="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white uppercase">
            Crypto<span className="text-primary">Moon</span>
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            id="user_menu"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-primary dark:focus:ring-primary"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/800px-Default_pfp.svg.png"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user ? `${user.fname} ${user.lname}` : ''}
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {user ? user.email : ''}
              </span>
            </div>
            <ul className="py-1" aria-labelledby="user-menu-button">
              <li>
                <Link to="/">
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Home
                  </span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
