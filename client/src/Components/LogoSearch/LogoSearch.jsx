import React from 'react'
import Logo from '../../Img/logo.png';
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  return (
    <div className="flex gap-3">

      <img src={Logo} alt="" />

      <div className="flex bg-[var(--inputColor)] rounded-[10px] p-[5px]">
        <input
          type="text"
          placeholder="#Search"
          className="bg-transparent border-none outline-none"
        />

        <div className="flex items-center justify-center bg-gradient-to-r from-[#6674cc] to-[#b578ff] rounded-[5px] p-1 text-white cursor-pointer">
          <SearchIcon />
        </div>
      </div>

    </div>
  )
}

export default LogoSearch