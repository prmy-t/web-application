const defaultState = {
  activeUser: {}
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_ACTIVEUSER(state, activeUserObj) {
    // console.log(typeof activeUserObj);
    // if (typeof activeUserObj == "string") {
    //   console.log(activeUserObj);
    //   state.activeUser = JSON.parse(activeUserObj);
    // } else {
    state.activeUser = activeUserObj;
    // }
  }
};
