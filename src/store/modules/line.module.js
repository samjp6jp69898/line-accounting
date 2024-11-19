import { lineLogin, getLineToken } from '../../services/lineApi.service'
import { jwtDecode } from "jwt-decode";


export default {
    namespaced: true,
    state: {
        lineLoginData: {}
    },
    getters: {
        accessToken: (state) => {
            return state.lineLoginData?.access_token ?? ''
        },
        idToken: (state) => {
            return state.lineLoginData?.id_token ?? ''
        },
        refreshToken: (state) => {
            return state.lineLoginData?.refresh_token ?? ''
        },
        decodedIDToken: (state, getters) => {
            return jwtDecode(getters.idToken ?? '')
        },
        name: (state, getters) => {
            return getters.decodedIDToken?.name ?? ''
        },
        avatar: (state, getters) => {
            return getters.decodedIDToken?.picture ?? ''
        },
        // 判斷 token 是否過期
        isTokenExpired: (state, getters) => {
            try {
                const expiredAt = getters.decodedIDToken.exp || 0;
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
        setLineLoginData(state, lineLoginData) {
            state.lineLoginData = lineLoginData;
        }
    },
    actions: {
        login({ state }, data) {
            console.log(state.lineLoginData)
            lineLogin(data)
        },
        async getToken({ commit }, code) {
            const res = await getLineToken(code)
            console.log('line login data', res)
            commit('setLineLoginData', res)
        }
    }
}