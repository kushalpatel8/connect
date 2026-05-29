import React, { useState, useRef } from 'react'
import { UserCircle } from 'lucide-react';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

const PostShare = () => {

    const loading = useSelector((state) => state.postReducer.uploading);
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData) || { user: {} };
    const desc = useRef();
    const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const reset = () => {
        setImage(null);
        desc.current.value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };

        if(image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append("name", fileName);
            data.append("file", image);
            newPost.image = fileName;
            try {
                dispatch(uploadImage(data));
            }
            catch(error) {
                console.log(error);
            }
        }
        dispatch(uploadPost(newPost));
        reset();
    }

    return (
        <div className="flex gap-4 glass-card p-5 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(150,21,219,0.1)]">
            
            {/* Profile Picture */}
            {user.profilePicture ? (
                <img
                    src={serverPublic + user.profilePicture}
                    alt="profile"
                    className="rounded-full w-12 h-12 object-cover shrink-0"
                />
            ) : (
                <div className="rounded-full w-12 h-12 bg-[#1a1d2d] flex items-center justify-center shrink-0">
                    <UserCircle className="w-8 h-8 text-[#b578ff]" strokeWidth={1.5} />
                </div>
            )}

            {/* Right Section */}
            <div className="flex flex-col w-[90%] gap-4">

                {/* Caption Input */}
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    required
                    ref={desc}
                    className="glass-input rounded-xl px-4 py-3 text-[15px] w-full mb-2"
                />

                {/* Post Options */}
                <div className="flex justify-around">

                    <div
                        className="flex items-center justify-center gap-1 py-[5px] px-[10px] rounded-[10px] text-[14px] cursor-pointer text-[var(--photo)]"
                        onClick={() => imageRef.current.click()}
                    >
                        <PhotoOutlinedIcon />
                        Photo
                    </div>

                    <div className="flex items-center justify-center gap-1 py-[5px] px-[10px] rounded-[10px] text-[14px] cursor-pointer text-[var(--video)]">
                        <PlayCircleOutlineIcon />
                        Video
                    </div>

                    <div className="flex items-center justify-center gap-1 py-[5px] px-[10px] rounded-[10px] text-[14px] cursor-pointer text-[var(--location)]">
                        <LocationOnOutlinedIcon />
                        Location
                    </div>

                    <div className="flex items-center justify-center gap-1 py-[5px] px-[10px] rounded-[10px] text-[14px] cursor-pointer text-[var(--shedule)]">
                        <CalendarMonthOutlinedIcon />
                        Shedule
                    </div>

                    {/* Share Button */}
                    <button
                        className="btn-primary py-2 px-8 text-sm rounded-xl font-bold tracking-wide"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Share"}
                    </button>

                    {/* Hidden File Input */}
                    <div className="hidden">
                        <input
                            type="file"
                            name="myImage"
                            ref={imageRef}
                            onChange={onImageChange}
                        />
                    </div>

                </div>

                {/* Image Preview */}
                {image && (
                    <div className="relative">
                        <CloseOutlinedIcon
                            onClick={() => setImage(null)}
                            className="absolute right-4 top-2 cursor-pointer"
                        />
                        <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            className="w-full h-80 object-cover rounded-lg"
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default PostShare;