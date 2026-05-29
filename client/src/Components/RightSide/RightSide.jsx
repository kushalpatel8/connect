import React, { useState } from 'react';
import Home from '../../Img/home.png';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Noti from '../../Img/noti.png';
import Comment from '../../Img/comment.png';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className="flex flex-col gap-8">

            <div className="mt-4 flex justify-between items-center">
                <Link to='../home'>
                    <img src={Home} alt="" className="w-8 h-8" />
                </Link>
                <SettingsOutlinedIcon />
                <img src={Noti} alt="" className="w-6 h-6" />
                <img src={Comment} alt="" className="w-6 h-6" />
            </div>

            <TrendCard />

            <div
                className="button h-12 w-4/5 self-center cursor-pointer"
                onClick={() => setModalOpened(true)}
            >
                Share
            </div>

            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

        </div>
    )
}

export default RightSide;