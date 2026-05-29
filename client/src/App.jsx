import { useSelector } from 'react-redux';
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Blur decorative blobs */}
      <div className="absolute w-52 h-52 rounded-full bg-blue-300/30 blur-3xl -top-[18%] right-0 pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full bg-blue-300/30 blur-3xl top-[36%] -left-32 pointer-events-none" />

      <Routes>
        <Route path='/' element={user ? <Navigate to='home' /> : <Navigate to='auth' />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to='../auth' />} />
        <Route path='/auth' element={user ? <Navigate to='../home' /> : <Auth />} />
        <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to='../auth' />} />
      </Routes>

    </div>
  );
}

export default App;
