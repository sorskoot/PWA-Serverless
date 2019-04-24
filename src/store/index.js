import Vue from 'vue';
import Vuex from 'vuex';

import { scores } from './score/scores.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        scores
    }
});