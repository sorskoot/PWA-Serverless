import {scoreService} from '../../services';
import {GET_SCORES,GET_SCORES_FAIL,GET_SCORES_SUCCESS} from './mutationTypes'

export default {
    getScores({commit}) {
      commit(GET_SCORES);
      scoreService.getList()
        .then(
            scores => commit(GET_SCORES_SUCCESS, scores),
            error => commit(GET_SCORES_FAIL, error)
        );
    }
}