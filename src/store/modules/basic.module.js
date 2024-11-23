import DataMo from "../../models/dataModel.model"

export default {
    namespaced: true,
    state: {
        theme: 'dark',
        liffInitStatus: false,
        currentPage: DataMo.Page.Personal
    },
    getters: {
        
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme
        },
        setLiffInitStatus(state, status) {
            state.liffInitStatus = status
        },
        setCurrentPage(state, page) {
            state.currentPage = page
        }
    },
    actions: {
        toggleTheme({ commit, state }) {
            const newTheme = state.theme === 'light' ? 'dark' : 'light'
            // 更改 html tag class
            document.documentElement.classList.remove(state.theme)
            document.documentElement.classList.add(newTheme)
            commit('setTheme', newTheme)
            document.documentElement.setAttribute('theme', newTheme)
            localStorage.setItem('theme', newTheme)
        }
    }
}