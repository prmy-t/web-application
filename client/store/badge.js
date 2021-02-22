const defaultState = {
  badgeValue: 0
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_BADGEVALUE(state, badgeValue) {
    state.badgeValue = badgeValue;
  }
};
