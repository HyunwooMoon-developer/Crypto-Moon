import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { UserType } from '../../types/types';
import { useAppDispatch } from '../../redux/hooks';
import { logout, reset } from '../../redux/authSlice';

const Sidebar = ({ user }: { user: UserType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };
  return (
    <div className="flex flex-col shadow-lg justify-between max-xl:hidden xl:h-screen xl:overflow-y-auto xl:fixed xl:w-60 bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
      <div>
        <h1 className="text-center my-10 text-3xl font-semibold whitespace-nowrap dark:text-white uppercase">
          Crypto<span className="text-primary">Moon</span>
        </h1>
        <div className="flex items-center justify-center flex-col gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/800px-Default_pfp.svg.png"
            alt="User Profile"
            className="w-28 h-28 rounded-full overflow-hidden shadow-md"
          />
          <h1>{user ? `${user.fname} ${user.lname}` : null}</h1>
        </div>
        <ul className="p-7">
          <li>
            <NavLink
              className="flex items-center my-3 gap-1 cursor-pointer hover:text-white hover:bg-primary duration-200 ease-in-out p-2 rounded-lg hover:shadow-inner"
              to="/"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? '#5E7FA6' : '',
                  color: isActive ? 'white' : '',
                };
              }}
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center justify-center gap-1 cursor-pointer mb-4 hover:bg-primary hover:shadow-inner duration-200 ease-in-out hover:text-white mx-7 p-2 rounded-lg"
      >
        <RiLogoutBoxRLine />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
