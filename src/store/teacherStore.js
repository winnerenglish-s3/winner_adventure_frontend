import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    teacherData: "teacherData"
  },
  mutations: {
    setTeacherData(state, payload) {
      state.teacherData = payload;
    }
  },
  getters: {
    teacherData: state => {
      return state.teacherData;
    }
  },
  actions: {
    setTeacherData({
      commit
    }, payload) {
      commit('setTeacherData', payload);
    }
  }
});
