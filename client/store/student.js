const defaultState = {
  activeStudent: {}
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_ACTIVESTUDENT(state, activeStudentObj) {
    state.activeStudent = activeStudentObj;
  }
};
