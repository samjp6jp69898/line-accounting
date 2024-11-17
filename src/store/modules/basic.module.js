export default {
    namespaced: true,
    state: {
        theme: 'dark'
    },
    getters: {
        
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme
        }
    },
    actions: {
        toggleTheme({ commit, state }) {
            const newTheme = state.theme === 'light' ? 'dark' : 'light'
            commit('setTheme', newTheme)
            document.documentElement.setAttribute('theme', newTheme)
            localStorage.setItem('theme', newTheme)
        }
    }
}