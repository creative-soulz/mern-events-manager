import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [loginError, setLoginError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      const errorMessage = err?.data?.message || err.error;
      setLoginError(errorMessage); // Set login error message
      toast.error(errorMessage);
    }
  };
  
  return (
    <div className="mx-4 sm:mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-center mt-8 mb-4">Sign In</h1>
      <form onSubmit={submitHandler} className="mb-8">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            id="password"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center top-1/3 transform -translate-y-4/1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5 text-black" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-black" />
            )}
          </button>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {loginError && <p className="text-red-500 mt-2 text-center">{loginError}</p>}
        {isLoading && <Loader />}
      </form>
      
    </div>
  );
};

export default Login;
