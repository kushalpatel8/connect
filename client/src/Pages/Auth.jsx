import React, { useState } from 'react';
import Logo from '../../Img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpass: '',
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const restForm = () => {
    setConfirmPass(true);
    setData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpass: '',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-16 bg-gray-50">

      {/* Left Side */}
      <div className="flex items-center gap-8">
        <img src={Logo} alt="Logo" className="w-16 h-16" />
        <div>
          <h2 className="text-2xl font-bold text-blue-700">Welcome!</h2>
          <h5 className="text-sm text-gray-500 mt-1">
            Explore the ideas throughout <br /> the world.
          </h5>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center">
        <form
          className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-6 w-80"
          onSubmit={handlSubmit}
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </h2>

          {isSignUp && (
            <div className="flex gap-3 w-full">
              <input
                type="text"
                placeholder="First Name"
                className="bg-gray-100 rounded-lg px-4 py-3 flex-1 outline-none text-sm"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="bg-gray-100 rounded-lg px-4 py-3 flex-1 outline-none text-sm"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div className="w-full">
            <input
              type="text"
              placeholder="Email"
              className="bg-gray-100 rounded-lg px-4 py-3 w-full outline-none text-sm"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          <div className="flex gap-3 w-full">
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-100 rounded-lg px-4 py-3 flex-1 outline-none text-sm"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-gray-100 rounded-lg px-4 py-3 flex-1 outline-none text-sm"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>

          {!confirmPass && (
            <span className="text-red-500 text-xs self-end mr-1">
              * Confirm Password is not same
            </span>
          )}

          <div className="w-full">
            <span
              className="text-xs text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => {
                setIsSignUp((prev) => !prev);
                restForm();
              }}
            >
              {isSignUp
                ? 'Already have an account? Login here'
                : "Don't have an account? SignUp here"}
            </span>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg px-6 py-2 w-24 transition-colors"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;