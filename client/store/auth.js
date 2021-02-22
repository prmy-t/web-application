import axios from "axios";
import Cookie from "js-cookie";
const SimpleCrypto = require("simple-crypto-js").default;
const myCrypto = new SimpleCrypto("myKey");
const defaultState = {
  isLoggedIn: false
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_IS_LOGGEDIN(state, status) {
    state.isLoggedIn = status;
  }
};

export const actions = {
  // methods
  reVerify({ commit }) {
    const customToken = Cookie.get("token");

    axios.defaults.headers.common.Authorization = `Bearer ${customToken}`;

    if (customToken != null && customToken != "null") {
      commit("SET_IS_LOGGEDIN", true);
    }
  }
};
