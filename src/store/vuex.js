import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		files: {
			file1: {
				file: undefined,
				table: {
					rows: [],
				},
			},
			file2: {
				file: undefined,
				table: {
					rows: [],
				},
			},
		},
	},
	// получать состояния из state ()
	getters: {
		file1(state) {
			return state.files.file1;
		},
		file2(state) {
			return state.files.file2;
		},
	},
	// изменение состояний \ присваивание
	mutations: {
		// устанавливать информацию в  один из файлов
		setFileData(state, payload) {
			state.files[payload.fileNumber] = payload.newFileData;
		},
	},
	actions: {},
	modules: {},
});
