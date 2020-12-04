import axios from 'axios'

export default {
    namespaced: 'users',
    state: {
        loading: false
    },
    mutations: {
      LOADING(state, val) {
          state.loading = val
      }
    },
    actions: {
        list({ commit }) {
            commit('LOADING', true)
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:8000/api/users')
                .then(response => {
                    commit('LOADING', false)
                    console.log(response)
                    resolve(response.data)
                })
                .catch(error => {
                    commit('LOADING', false)
                    reject(error.response)
                })
            })
        },
        show({ commit }, id) {
            commit('LOADING', true)
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:8000/api/users/${id}`)
                .then(response => {
                    commit('LOADING', false)
                    console.log(response)
                    resolve(response.data)
                })
                .catch(error => {
                    commit('LOADING', false)
                    reject(error.response)
                })
            })
        },
        create({ commit }, data) {
            commit('LOADING', true)
            return new Promise((resolve, reject) => {
                axios.post(`http://localhost:8000/api/users/`, data)
                .then(response => {
                    commit('LOADING', false)
                    resolve(response.data)
                })
                .catch(error => {
                    commit('LOADING', false)
                    reject(error.response)
                })
            })
        },
        update({ commit }, data) {
            commit('LOADING', true)
            return new Promise((resolve, reject) => {
                axios.put(`http://localhost:8000/api/users/${data.id}`, data)
                .then(response => {
                    commit('LOADING', false)
                    resolve(response.data)
                })
                .catch(error => {
                    commit('LOADING', false)
                    reject(error.response)
                })
            })
        },
        genders() {
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:8000/api/genders`)
                .then(response => {
                    let genders = []
                    Object.keys(response.data).forEach((element)=>{
                        genders.push({ id: element, name: response.data[element]})
                    })
                    resolve(genders)
                })
                .catch(error => {
                    
                    reject(error.response)
                })
            })
        },
        deleteUser({ commit }, id) {
            commit('LOADING', true)
            return new Promise((resolve, reject) => {
                axios.delete(`http://localhost:8000/api/users/${id}`)
                .then(response => {
                    commit('LOADING', false)
                    console.log(response)
                    resolve(response.data)
                })
                .catch(error => {
                    commit('LOADING', false)
                    reject(error.response)
                })
            })
        }
    },
    getters: {
        loading: state => state.loading
    }
}