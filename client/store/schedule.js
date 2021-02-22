export const state = () => ({
  schedule: {}
});

export const mutations = {
  CHANGE_NAV_LAYOUT(state, schedule) {
    state.schedule = schedule;
  }
};
