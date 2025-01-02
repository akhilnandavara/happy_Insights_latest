
const BASE_URL = import.meta.env.VITE_BASE_URL
export const testAPi={
    test:BASE_URL+"/welcome",
    // test:"https://app.happyinsights.ai/api/v1/welcome"
}
export const authApi = {
    login: BASE_URL + '/login/sign-in',
    signup: BASE_URL + '/login/web-sign-up',
    logout: BASE_URL + '/user/logout',
    getClientId: BASE_URL + "/login/google-sso-detail",
    googleLogin: BASE_URL + '/login/save-google-authentication-token',
}

export const userApi = {
    getUserDetails: BASE_URL + "/user/my-profile",
    getAllConfig: BASE_URL + "/user/all-configurations",
}
export const youtubeAPi = {
    saveYoutubeConfig: BASE_URL + "/user/youtube-channel-subscribe",
    getYoutubeVideoList: BASE_URL + "/user/youtube-video-list",
    getCommentsList: BASE_URL + "/user/youtube-comments-list",
    saveFavVideo: BASE_URL + "/user/youtube-video-favorite",
}
