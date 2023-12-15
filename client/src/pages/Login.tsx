import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login, reset } from '../redux/authSlice';
import Spinner from '../components/UI/Spinner';
import { RegisterType } from '../types/types';
import { inputStyle, labelStyle } from './Register';

const Login = () => {
  const [inputs, setInputs] = useState<
    Pick<RegisterType, 'email' | 'password'>
  >({ email: '', password: '' });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(login(inputs));
  };

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess || user) navigate('/');

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center h-screen dark:bg-gray-800">
      <div className="h-max max-sm:w-full mt-12 p-10 w-[550px]">
        <div className="flex flex-col gap-10">
          <div className="text-center">
            <h1 className="text-4xl font-semibold mb-3 tracking-tight dark:text-white uppercase">
              Crypto<span className="text-primary">Moon</span>
            </h1>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Login
            </h1>
            <span className="text-primary">
              Or{' '}
              <Link className="hover:underline" to="/register">
                Register
              </Link>
            </span>
          </div>
          <div className="bg-white rounded-lg p-5 shadow dark:bg-gray-900">
            <form onSubmit={onSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={inputStyle}
                  name="email"
                  value={inputs.email}
                  onChange={onChange}
                  placeholder="Type Email"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className={labelStyle}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={inputStyle}
                  name="password"
                  value={inputs.password}
                  onChange={onChange}
                  placeholder="Type Password"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white w-full bg-primary hover:shadow-inner focus:ring-4 font-medium rounded-lg text-sm px-5 mr-2 mb-2 dark:bg-primary focus:outline-none py-2.5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
