import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
    const theme = useMantineTheme();
    const { password, ...other } = data;
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useDispatch();
    const param = useParams();
    const { user } = useSelector((state) => state.authReducer.authData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === "profileImage"
                ? setProfileImage(img)
                : setCoverImage(img);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let UserData = { ...formData };
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append("name", fileName);
            data.append("file", profileImage);
            UserData.profilePicture = fileName;
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append("name", fileName);
            data.append("file", coverImage);
            UserData.coverPicture = fileName;
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(updateUser(param.id, UserData));
        setModalOpened(false);
    }
    return (
        <>
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                size="55%"
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
            >
                <form className='flex flex-col gap-4 text-white' >
                    <h3 className="font-bold text-xl mb-4 text-[#b578ff]">Update Your Info</h3>
                    
                    <div className="flex gap-4">
                        <input type="text" placeholder='First Name' className='glass-input rounded-xl px-4 py-3 text-sm w-full' name="firstname"
                            onChange={handleChange} value={formData.firstname} />
                        <input type="text" placeholder='Last Name' className='glass-input rounded-xl px-4 py-3 text-sm w-full' name="lastname"
                            onChange={handleChange} value={formData.lastname} />
                    </div>
                    
                    <div className="flex gap-4">
                        <input type="text" placeholder='Works At' className='glass-input rounded-xl px-4 py-3 text-sm w-full' name="worksAt"
                            onChange={handleChange} value={formData.worksAt} />
                    </div>
                    
                    <div className="flex gap-4">
                        <input type="text" placeholder='Lives in' className='glass-input rounded-xl px-4 py-3 text-sm w-full' name="livesin"
                            onChange={handleChange} value={formData.livesin} />
                        <input type="text" placeholder='Country' className='glass-input rounded-xl px-4 py-3 text-sm w-full' name="country"
                            onChange={handleChange} value={formData.country} />
                    </div>
                    
                    <div className="flex gap-4">
                        <input type="text" placeholder='Relationship Status' className='glass-input rounded-xl px-4 py-3 text-sm w-full' name="relationship"
                            onChange={handleChange} value={formData.relationship} />
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-2">
                        <h5 className="text-gray-300 font-medium">Profile Image</h5>
                        <input type="file" name='profileImage' onChange={onImageChange} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#9615db] file:text-white hover:file:bg-[#b578ff] cursor-pointer" />
                        
                        <h5 className="text-gray-300 font-medium mt-2">Cover Image</h5>
                        <input type="file" name='coverImage' onChange={onImageChange} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#9615db] file:text-white hover:file:bg-[#b578ff] cursor-pointer" />
                    </div>
                    
                    <button className='btn-primary rounded-xl px-8 py-3 font-semibold tracking-wide mt-4 self-end' onClick={handleSubmit}>Update</button>
                </form>
            </Modal>
        </>
    );
}
export default ProfileModal;