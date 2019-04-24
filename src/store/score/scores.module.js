import actions from './scores.actions';
import mutations from './scores.mutations';

export const scores = {
  state: {
    scores:[],
    loading:false
  },
  actions: actions,
  mutations: mutations
}
