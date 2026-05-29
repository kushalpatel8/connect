import * as PostApi from '../api/PostRequest';

export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: "RETERVING_START" });
    try {
        const { data } = await PostApi.getTimelinePosts(id);
        dispatch({ type: "RETERVING_SUCCESS", data: data });
    }
    catch (error) {
        dispatch({ type: "RETERVING_FAIL" });
    }
}