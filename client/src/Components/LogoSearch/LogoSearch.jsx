import React from 'react'
import Logo from '../../Img/logo.png';
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  return (
    <div className="flex gap-4 items-center">

      <img src={Logo} alt="" className="w-10 h-10 drop-shadow-[0_0_10px_rgba(150,21,219,0.4)]" />

      <div className="flex glass-input rounded-xl p-1 overflow-hidden transition-all hover:shadow-[0_0_10px_rgba(150,21,219,0.1)] w-full">
        <input
          type="text"
          placeholder="#Explore"
          className="bg-transparent border-none outline-none px-3 text-sm text-white w-full placeholder-gray-400"
        />

        <div className="flex items-center justify-center btn-primary rounded-lg p-2 text-white cursor-pointer">
          <SearchIcon />
        </div>
      </div>

    </div>
  )
}

export default LogoSearch