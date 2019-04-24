import {GET_SCORES,GET_SCORES_FAIL,GET_SCORES_SUCCESS} from './mutationTypes'
import {mapState} from 'vuex';

export default {
    [GET_SCORES](state) {
        state.loading = true;
    },
    [GET_SCORES_SUCCESS](state, scores) {
        state.scores = scores;
        state.loading = false;
    },
    [GET_SCORES_FAIL](state, error) {
        state.loading = false;
        state.error = error;
    }
}