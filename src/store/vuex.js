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
        compared: {
            unMatched: '',
            unMatched2: '',
            unmatchedHighlight: '',
            goodAnswer: '',
            noResults: '',
            noResults2: '',
            nameFile1: '',
            nameFile2: '',
        },
    },
    // получать состояния из state ()
    getters: {
        file1(state) {
            // если true то вернуть file1 иначе переадресация на 404
            if (state.files.file1.file) {
                return state.files.file1;
            }
            router.push('/');
        },
        file2(state) {
            if (state.files.file1.file) {
                return state.files.file2;
            }
            router.push('/');
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

        unMatched(state) {
            return state.compared.unMatched;
        },
        unMatched2(state) {
            return state.compared.unMatched2;
        },
        unmatchedHighlight(state) {
            return state.compared.unmatchedHighlight;
        },
        goodAnswer(state) {
            return state.compared.goodAnswer;
        },
        noResults(state) {
            return state.compared.noResults;
        },
        noResults2(state) {
            return state.compared.noResults2;
        },
        nameFile1(state) {
            return state.compared.nameFile1;
        },
        nameFile2(state) {
            return state.compared.nameFile2;
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
        addToComparedArray(state, { fileNumber, indexOfSelect, valueOfAtribute }) {
            if (fileNumber == 'file1') {
                if (valueOfAtribute === 'Unset') {
                    state.comparedFields[indexOfSelect][0] = null;
                } else {
                    state.comparedFields[indexOfSelect][0] = valueOfAtribute;
                }
            } else {
                if (valueOfAtribute === 'Unset') {
                    state.comparedFields[indexOfSelect][1] = null;
                } else {
                    state.comparedFields[indexOfSelect][1] = valueOfAtribute;
                }
            }
        },
        unMatched(state, unmatched) {
            state.compared.unMatched = unmatched;
        },
        unMatched2(state, unmatched2) {
            state.compared.unMatched2 = unmatched2;
        },
        unmatchedHighlight(state, unmatchedHighlight) {
            state.compared.unmatchedHighlight = unmatchedHighlight;
        },
        noResults(state, noResults) {
            state.compared.noResults = noResults;
        },
        goodMatched(state, goodAnswer) {
            state.compared.goodAnswer = goodAnswer;
        },
        noResults(state, noResults) {
            state.compared.noResults = noResults;
        },
        noResults2(state, noResults2) {
            state.compared.noResults2 = noResults2;
        },
        nameFile1(state, nameFile1) {
            state.compared.nameFile1 = nameFile1;
        },
        nameFile2(state, nameFile2) {
            state.compared.nameFile2 = nameFile2;
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
        compare(context) {
            let maxRowsNumber = context.state.files.file1.table.rows.length;
            if (maxRowsNumber < context.state.files.file2.table.rows.length) {
                maxRowsNumber = context.state.files.file2.table.rows.length;
            }

            let isUnmatch = false;
            context.commit('goodMatched', '');

            for (let i = 0; i < maxRowsNumber; i++) {
                let unmatchedRows = [];
                context.state.comparedFields.forEach((element) => {
                    // если не unset то делаем сравнение
                    if (element[0] && element[1]) {
                        const rowFile0 = context.state.files.file1.table.rows[i];
                        const rowFile1 = context.state.files.file2.table.rows[i];
                        if (rowFile0 && rowFile1 && String(rowFile0[element[0]]) !== String(rowFile1[element[1]])) {
                            unmatchedRows.push([rowFile0, rowFile1, element[0], element[1]]);
                            isUnmatch = true;
                        }
                    }
                });
                if (unmatchedRows.length === 1) {
                    for (const unmatchedRow of unmatchedRows) {
                        // console.log(
                        let unmatched = String(Object.values(unmatchedRow[0]).join(' | '));
                        let unmatchedHighlight = ' Частично совпадает c ';
                        let unmatched2 = String(
                            Object.values(unmatchedRow[1]).join(' | ') +
                                '. Обнаружено несовпадение колонки ' +
                                unmatchedRow[2] +
                                ' с колонкой  ' +
                                unmatchedRow[3],
                        );

                        context.commit('unMatched', unmatched);
                        context.commit('unMatched2', unmatched2);
                        context.commit('unmatchedHighlight', unmatchedHighlight);
                    }
                } else {
                    for (const unmatchedRow of unmatchedRows) {
                        let noResults = Object.values(unmatchedRow[0]).join(' | ');
                        let nameFile1 = context.state.files.file1.file.name;
                        let nameFile2 = context.state.files.file2.file.name;
                        //    nothingInFile
                        let noResults2 = Object.values(unmatchedRow[1]).join(' | ');

                        context.commit('noResults', noResults);
                        context.commit('noResults2', noResults2);
                        context.commit('nameFile1', nameFile1);
                        context.commit('nameFile2', nameFile2);
                    }
                }
            }
            if (!isUnmatch) {
                context.commit('goodMatched', 'Полное совпадение');
            }
        },
    },
    modules: {},
});
