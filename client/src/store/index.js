import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    notes: [],
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setNotes(state, notes) {
      state.notes = notes;
    },
    deleteNote(state, noteId) {
      const notes = state.notes.filter((elm) => {
        return elm._id !== noteId;
      });
      state.notes = notes;
    },
  },
  actions: {},
  modules: {},
});
