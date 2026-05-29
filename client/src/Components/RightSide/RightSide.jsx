import React, { useState } from 'react';
import { Home, Settings, Bell, MessageSquare } from 'lucide-react';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModel/ShareModel';
import { Link } from 'react-router-dom';

const RightSide = () => {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className="flex flex-col gap-8">

            <div className="mt-4 flex justify-between items-center text-white">
                <Link to='../home'>
                    <Home className="w-7 h-7 hover:scale-110 transition-transform duration-200 cursor-pointer text-[#b578ff]" strokeWidth={2} />
                </Link>
                <Settings className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200 text-gray-300 hover:text-white" strokeWidth={2} />
                <Bell className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200 text-gray-300 hover:text-white" strokeWidth={2} />
                <MessageSquare className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200 text-gray-300 hover:text-white" strokeWidth={2} />
            </div>

            <TrendCard />

            <div
                className="btn-primary flex items-center justify-center h-12 w-4/5 self-center cursor-pointer rounded-xl font-bold tracking-wide"
                onClick={() => setModalOpened(true)}
            >
                Share
            </div>

            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

        </div>
    )
}

export default RightSide;