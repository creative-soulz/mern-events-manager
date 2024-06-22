import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFaculty, setIsFaculty] = useState(false);
  const [isStdRep, setIsStdRep] = useState(false);

  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
   

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          username,
          email,
          password,
          isAdmin,
          isFaculty,
          isStdRep,
        }).unwrap();
        dispatch({ ...res });
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="mx-4 md:mx-auto md:w-[40rem]">
      <Typography variant="h4" color="white" className="mt-5">
        CREATE USER
      </Typography>
      <Link to="/admin/userlist">
        <Button className="mt-3 mb-5 bg-blue-500 text-white py-2 px-4 rounded-lg">
          Manage User
        </Button>
      </Link>
      <form onSubmit={submitHandler} className="mb-10">
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-white">Position</label>
          <div>
            <label htmlFor="isAdmin" className="mr-4 text-white">
              Admin
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="ml-2"
              />
            </label>
            <label htmlFor="isFaculty" className="mr-4 text-white">
              Faculty
              <input
                type="checkbox"
                id="isFaculty"
                checked={isFaculty}
                onChange={(e) => setIsFaculty(e.target.checked)}
                className="ml-2"
              />
            </label>
            <label htmlFor="isStdRep" className="text-white">
              Student Representative
              <input
                type="checkbox"
                id="isStdRep"
                checked={isStdRep}
                onChange={(e) => setIsStdRep(e.target.checked)}
                className="ml-2"
              />
            </label>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default Register;
  