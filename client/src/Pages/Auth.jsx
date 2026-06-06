import React, { useState } from 'react';
import Logo from '../Img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../actions/AuthAction.js';

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
    <div className="flex items-center justify-center min-h-[100vh] gap-16 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#4ade80]/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#7c3aed]/15 blur-[120px] pointer-events-none"></div>

      {/* Left Side */}
      <div className="flex items-center gap-8 z-10 hidden md:flex">
        <img src={Logo} alt="Logo" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]" />
        <div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#7c3aed]">Connect</h2>
          <h5 className="text-sm text-gray-300 mt-2 font-medium tracking-wide">
            Explore the ideas throughout <br /> the world.
          </h5>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center z-10">
        <form
          className="glass-card rounded-3xl p-8 flex flex-col items-center gap-6 w-[22rem] transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]"
          onSubmit={handlSubmit}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          {isSignUp && (
            <div className="flex gap-3 w-full">
              <input
                type="text"
                placeholder="First Name"
                className="glass-input rounded-xl px-4 py-3 flex-1 text-sm w-full"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="glass-input rounded-xl px-4 py-3 flex-1 text-sm w-full"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div className="w-full">
            <input
              type="text"
              placeholder="Email Address"
              className="glass-input rounded-xl px-4 py-3 w-full text-sm"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <input
              type="password"
              placeholder="Password"
              className="glass-input rounded-xl px-4 py-3 w-full text-sm"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="glass-input rounded-xl px-4 py-3 w-full text-sm"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>

          {!confirmPass && (
            <span className="text-red-400 text-xs self-start ml-1 -mt-2 font-medium">
              * Passwords do not match
            </span>
          )}

          <div className="w-full text-center mt-2">
            <span
              className="text-xs text-gray-400 cursor-pointer hover:text-white transition-colors"
              onClick={() => {
                setIsSignUp((prev) => !prev);
                restForm();
              }}
            >
              {isSignUp
                ? 'Already have an account? Login here'
                : "Don't have an account? Sign up here"}
            </span>
          </div>

          <button
            className="btn-primary rounded-xl px-8 py-3 w-full font-semibold tracking-wide mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;