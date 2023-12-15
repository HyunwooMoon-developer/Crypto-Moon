import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './UI/Sidebar';
import Navbar from './UI/Navbar';

const AuthRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="flex">
      {user ? <Sidebar user={user} /> : null}
      <div className="xl:ml-60 p-10 max-xl:pt-0 min-h-screen w-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthRoute;
