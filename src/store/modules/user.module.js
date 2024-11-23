import { jwtDecode } from "jwt-decode";

export default {
    namespaced: true,
    state: {
        token: '',
        name: '',
        avatar: '',
        isLogin: false,
    },
    getters: {
        name: (state, getters) => {
            return getters.decodedIDToken?.name ?? ''
        },
        avatar: (state, getters) => {
            return getters.decodedIDToken?.picture ?? ''
        },
        // 判斷 token 是否過期
        isTokenExpired: (state, getters) => {
            try {
                const expiredAt = state.token.exp || 0;
                // 獲取當前日期的 Unix timestamp
                const currentDate = Math.floor(Date.now() / 1000);
                // 如果 token 的過期時間小於當前時間，則 token 已過期
                return expiredAt < currentDate;

            } catch (error) {
                return true;
            }
        },
        isLogin: (state, getters) => {
            try {
                return !getters.isTokenExpired;
            } catch (error) {
                return false;
            }
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setName(state, name) {
            state.name = name;
        },
        setAvatar(state, avatar) {
            state.avatar = avatar;
        },
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin;
        }
    },
    actions: {
    }
}