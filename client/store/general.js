const defaultState = {
  flag: "student"
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_FLAG(state, flag) {
    state.flag = flag;
  }
};
