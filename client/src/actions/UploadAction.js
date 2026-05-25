import * as UploadApi from '../api/UploadRequest';

const uploadImage = (data) => async (dispatch) => {
    try {
        await UploadApi.uploadImage(data);
    }
    catch (error) {
        console.log(error);
    }
}

const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    try {
        const { data } = await UploadApi.uploadPost(data);
        dispatch({ type: "UPLOAD_SUCCESS", data: data });
    }
    catch (error) {
        dispatch({ type: "UPLOAD_FAIL" });
    }
}