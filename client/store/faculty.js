const defaultState = {
  activeFaculty: {}
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_ACTIVEFACULTY(state, activeFacultyObj) {
    state.activeFaculty = activeFacultyObj;
  }
};
