import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register, reset } from '../redux/authSlice';
import Spinner from '../components/UI/Spinner';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RegisterType } from '../types/types';

export const inputStyle =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary';
export const labelStyle =
  'block w-max mb-2 text-sm font-medium text-gray-900 dark:text-white';

const Register = () => {
  const [inputs, setInputs] = useState<RegisterType>({
    email: '',
    password: '',
    fname: '',
    lname: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(register(inputs));
  };

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) navigate('/login');

    dispatch(reset());
  }, [isLoading, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center h-screen dark:bg-gray-800">
      <div className="h-max max-sm:w-full w-[550px] mt-12 p-10">
        <div className="flex flex-col gap-10">
          <div className="text-center">
            <h1 className="text-4xl font-semibold mb-3 tracking-tight dark:text-white uppercase">
              Crypto<span className="text-primary">Moon</span>
            </h1>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Register
            </h1>
            <span className="text-primary">
              Or{' '}
              <Link className="hover:underline" to="/login">
                Login
              </Link>
            </span>
          </div>
          <form onSubmit={onSubmit}>
            <div className="bg-white rounded-lg p-5 shadow dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="mb-6 w-[45%]">
                  <label htmlFor="fname" className={labelStyle}>
                    First Name
                  </label>
                  <input
                    type="text"
                    className={inputStyle}
                    id="fname"
                    name="fname"
                    value={inputs.fname}
                    onChange={onChange}
                    placeholder="Type First Name"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-6 w-[45%]">
                  <label htmlFor="lname" className={labelStyle}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    className={inputStyle}
                    name="lname"
                    value={inputs.lname}
                    onChange={onChange}
                    placeholder="Type Last Name"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
