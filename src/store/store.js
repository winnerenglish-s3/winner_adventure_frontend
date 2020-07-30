import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userData: "userData"
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
    }
  },
  getters: {
    userData: state => {
      return state.userData;
    }
  },

});
