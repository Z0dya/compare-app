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
            goodAnswer: '',
        },
        compareResult: {
            partical: [],
            absolute: [],
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
        compareResult(state) {
            return state.compareResult;
        },
        goodAnswer(state) {
            return state.compared.goodAnswer;
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
        goodMatched(state, goodAnswer) {
            state.compared.goodAnswer = goodAnswer;
        },
        addCompareResultPartical(state, payload) {
            state.compareResult.partical.push({
                rowInFile0: payload.rowInFile0,
                rowInFile1: payload.rowInFile1,
            });
        },
        addCompareResultNotAbsolute(state, payload) {
            state.compareResult.absolute.push({
                rowInFile0: payload.rowInFile0,
                nameOfFile1: payload.nameOfFile1,
            });
        },
        clearCompareResult(state) {
            state.compareResult.partical = [];
            state.compareResult.absolute = [];
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
            context.commit('clearCompareResult');

            // нахождение максимального количества строк в 2 файлах
            let maxRowsNumber = Math.max(
                context.state.files.file1.table.rows.length,
                context.state.files.file2.table.rows.length,
            );
            // нет ни одной ошибки
            let isAccordance = true;
            // очищение полного совпадения
            context.commit('goodMatched', '');

            const rowFile0 = context.state.files.file1.table.rows;
            const rowFile1 = context.state.files.file2.table.rows;

            // перебор строк из первого файла
            for (let i = 0; i < maxRowsNumber; i++) {
                let unmatchedRows = {};
                // перебор строк из второго файла
                for (let j = 0; j < maxRowsNumber; j++) {
                    // перебор столбцов поочерёдно
                    context.state.comparedFields.forEach((comparedColumns) => {
                        // если не unset то делаем сравнение
                        if (comparedColumns[0] && comparedColumns[1]) {
                            if (rowFile0[i] && rowFile1[j]) {
                                /* Структура:
                                unmachedRows = {
                                    'номер_строки_первый_файл (i-0)': {
                                        'номер_строки_второй_файл (j-0)': {}
                                        'номер_строки_второй_файл (j-1)': {}
                                        'номер_строки_второй_файл (j-2)': {}
                                    }
                                    'номер_строки_первый_файл (i-1)': {
                                        'номер_строки_второй_файл (j-0)': {}
                                        'номер_строки_второй_файл (j-1)': {}
                                        'номер_строки_второй_файл (j-2)': {}
                                    }
                                 } */

                                // если в unmatchedRows(строки в файлах) отсутствует поле с номером i,
                                // то создаём поле i и задаём ему пустой объект
                                if (!unmatchedRows.hasOwnProperty(i)) {
                                    unmatchedRows[i] = {};
                                }

                                // если в unmatchedRows в поле i отсутствует поле с номером j,
                                // то создаём поле j в поле i и задаём  ему пустой объект
                                if (unmatchedRows.hasOwnProperty(i) && !unmatchedRows[i].hasOwnProperty(j)) {
                                    unmatchedRows[i][j] = {};
                                }
                                // comparedColumnds - название столбцов которые выбрали в select
                                if (
                                    String(rowFile0[i][comparedColumns[0]]) === String(rowFile1[j][comparedColumns[1]])
                                ) {
                                    unmatchedRows[i][j][comparedColumns[0]] = true;
                                    return;
                                }
                                unmatchedRows[i][j][comparedColumns[0]] = false;
                            }
                        }
                    });
                }

                console.log(unmatchedRows);

                // полное совпадение и частичное несовпадение
                let isAbsoluteCompare = false;
                let isParticalCompare = false;
                for (const [key, rowInFile1] of Object.entries(unmatchedRows[i])) {
                    const countOfColumns = Object.values(rowInFile1).length;
                    // все столбцы 1 файла фильтруем по true
                    const compareCount = Object.values(rowInFile1).filter((value) => value === true).length;
                    // если кол-во столбцов = кол-во столбцов которые совпали
                    if (countOfColumns === compareCount) {
                        isAbsoluteCompare = true;
                        break;
                        // проверка на то, что колонка только одна иначе отсутсвие true - это гарантированное неполное совпадение
                    } else if (countOfColumns !== 1) {
                        // (частичное) если кол-во столбцов -1 = кол-во столбцов которые совпали
                        if (countOfColumns - 1 === compareCount) {
                            isParticalCompare = true;
                            // вызов мутации
                            context.commit('addCompareResultPartical', {
                                rowInFile0: rowFile0[i],
                                rowInFile1: rowFile1[key],
                            });
                            break;
                        }
                    }
                }
                // если полное совпадение
                if (isAbsoluteCompare) {
                    continue;
                    // полное НЕСОВПАДЕНИЕ
                } else if (!isParticalCompare) {
                    context.commit('addCompareResultNotAbsolute', {
                        rowInFile0: rowFile0[i],
                        nameOfFile1: context.state.files.file2.file.name,
                    });
                }
                // если не совпало или частично совпало, то не выводим полное совпадение
                if (!isAbsoluteCompare || isParticalCompare) {
                    isAccordance = false;
                }
            }

            // если соотвествует то выводим полное совпадение
            if (isAccordance) {
                context.commit('goodMatched', 'Полное совпадение');
            }
        },
    },
    modules: {},
});
