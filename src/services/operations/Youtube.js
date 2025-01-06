import { YtCommentsAPiResponse, YtvideosAPiResponse } from "../../data/youtubeVideosList";
import { setCommentsList, setLoading, setVideoList } from "../../store/slices/youTubeSlice";
import { apiConnector } from "../apiConnector";
import { youtubeAPi } from "../apis";

// Fetch all configurations and save to localStorage
export const getYoutubeVideoList = (channel_id) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            dispatch(setVideoList(YtvideosAPiResponse)); // TODO Why items[0] array if we are getting only one channel video list?

            const res = await apiConnector("POST", youtubeAPi.getYoutubeVideoList, {
                channel_ids: channel_id
            });
            if (res.data.status) {
                // dispatch(setVideoList(res.data.items)); // TODO Why items[0] array if we are getting only one channel video list?
            } else {
                console.warn("Failed to fetch Videos List. Status:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching Video List:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const getCommentsList = (video_ids) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        console.log(video_ids)
        try {
            dispatch((setCommentsList(YtCommentsAPiResponse.items)));
            const res = await apiConnector("POST", youtubeAPi.getCommentsList,{
                video_ids: video_ids
            });
            if (res.data.status) {
                console.log("Response...", res.data)
                // dispatch(setCommentsList(res.data.items));
            } else {
                console.warn("Failed to fetch Comments. Status:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching Comments List:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};
export const saveFavVideos = (video_ids) => {
    console.log(video_ids)
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const res = await apiConnector("POST", youtubeAPi.saveFavVideo, {
                video_ids: video_ids,
                favorite: true
            });
            console.log("res...", res)
            if (res.data.status) {
            } else {
                console.warn("Failed to fetch Comments. Status:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching Comments List:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
};