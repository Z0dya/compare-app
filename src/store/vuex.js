import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        files: {
            file1: {
                file: undefined,
                selectedFields: {},
                table: {
                    rows: [],
                },
            },
            file2: {
                file: undefined,
                selectedFields: {},
                table: {
                    rows: [],
                },
            },
        },
    },
    // получать состояния из state ()
    getters: {
        file1(state) {
            // если true то вернуть file1 иначе переадресация на 404
            if (state.files.file1.file) {
                return state.files.file1;
            }
            router.push('/404');
        },
        file2(state) {
            if (state.files.file1.file) {
                return state.files.file2;
            }
            router.push('/404');
        },
        maxElementsInFiles(state) {
            // возвращаем наибольшее кол-во столбцов
            // если кол-во столбцов в 1 файле больше чем во 2, то возвращаем кол-во 1 файла иначе наоборот
            if (Object.keys(state.files.file1.table.rows[0]) > Object.keys(state.files.file2.table.rows[0])) {
                return Object.keys(state.files.file1.table.rows[0]);
            }
            return Object.keys(state.files.file2.table.rows[0]);
        },
    },
    // изменение состояний \ присваивание
    mutations: {
        // заносим данные из excel таблиц в state
        setFileData(state, payload) {
            state.files[payload.fileNumber] = payload.newFileData;
        },
    },
    actions: {},
    modules: {},
});
