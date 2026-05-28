import React, { useState, useRef } from 'react'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
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
    const dsec = useSelector((state) => state.authReducer.user);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

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
        <div className="flex gap-4 bg-[var(--cardColor)] p-4 rounded-2xl">
            
            {/* Profile Picture */}
            <img
                src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
                alt="profile"
                className="rounded-full w-12 h-12 object-cover"
            />

            {/* Right Section */}
            <div className="flex flex-col w-[90%] gap-4">

                {/* Caption Input */}
                <input
                    type="text"
                    placeholder="Write a caption..."
                    required
                    ref={desc}
                    className="bg-[var(--inputColor)] rounded-[10px] px-[10px] py-[10px] text-[17px] border-none outline-none"
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
                        className="py-[5px] px-5 text-[15px] rounded-[10px] bg-gradient-to-r from-[#6674cc] to-[#b578ff] text-white cursor-pointer disabled:opacity-50"
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