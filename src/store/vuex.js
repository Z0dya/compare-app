import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        files: {
            file1: {
                file: undefined,
                fields: [],
                table: {
                    rows: [],
                },
            },
            file2: {
                file: undefined,
                fields: [],
                table: {
                    rows: [],
                },
            },
        },
        comparedFields: [],
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
        comparedFields(state) {
            return state.comparedFields;
        },
    },
    // изменение состояний \ присваивание
    mutations: {
        // заносим данные из excel таблиц в state
        setFileData(state, { fileNumber, newFileData }) {
            state.files[fileNumber] = newFileData;
        },
        // названия столбцов (массив) с цифрой 1 или 2 файл
        addFields(state, { rowsInfo, fileNumber }) {
            state.files[fileNumber].fields = rowsInfo;
            console.log(fileNumber);
            console.log(state.files[fileNumber].fields);
        },
        lengthComparedArray(state, length) {
            for (let i = 0; i < length; i++) {
                state.comparedFields.push([]);
            }
        },
        // запись в массив выбранные значения пользователем ( в виде индекса )
        addToComparedArray(state, { fileNumber, indexOfSelect, indexOfAtribute }) {
            if (fileNumber == 'file1') {
                if (indexOfAtribute === 'Unset') {
                    state.comparedFields[indexOfSelect][0] = null;
                } else {
                    state.comparedFields[indexOfSelect][0] = indexOfAtribute;
                }
            } else {
                if (indexOfAtribute === 'Unset') {
                    state.comparedFields[indexOfSelect][1] = null;
                } else {
                    state.comparedFields[indexOfSelect][1] = indexOfAtribute;
                }
            }
        },
    },
    actions: {
        loadFileInformation(context, payload) {
            // отправка данных из файла
            context.commit('setFileData', payload);
            // запись в отдельную переменную названия столбцов определенного файла (определяется по fileNumber)
            const rowsInfo = Object.keys(context.state.files[payload.fileNumber].table.rows[0]);
            // отправка названия столбцов (массив) с цифрой 1 или 2 файл
            context.commit('addFields', { rowsInfo, fileNumber: payload.fileNumber });
            // получаем макс. кол-во столбцов из 2 файлов
            if (context.state.files.file1.file && context.state.files.file2.file) {
                const length = context.getters.maxElementsInFiles.length;
                context.commit('lengthComparedArray', length);
            }
        },
        selectField(context, payload) {
            context.commit('addToComparedArray', payload);
        },
    },
    modules: {},
});
