<template>
	<div class="container">
		<div class="imgBlock">
			<img src="../assets/ab-testing 1.svg" alt="compareLogo" />
		</div>
		<div class="btnBlock">
			<input type="file" class="firstBtn" placeholder="Загрузить 1 файл" ref="file1" @change="upload1" :accept="AvailableFormats" />
			<input type="file" class="secondBtn" placeholder="Загрузить 2 файл" ref="file2" @change="upload2" :accept="AvailableFormats" />
		</div>

		<div class="nextPage">
			<router-link to="/comparing" class="nextLink">
				<button class="nextBtn" ref="next" :disabled="nextBtn">Далее</button>
			</router-link>
		</div>
		<div class="repos">
			<a href="https://github.com/Z0dya/compare-app" target="_blank"> <img src="../assets/Git (1).svg" alt="gitIco" class="git" /></a>
			<a href="#"> <img src="../assets/gitlab 1 (1).svg" alt="gitlabIco" class="gitlab" /></a>
		</div>
	</div>
</template>

<script>
import { read, utils } from 'xlsx';
import { mapGetters } from 'vuex';

export default {
	name: 'App',
	data: function () {
		return {
			nextBtn: true,
			AvailableFormats: ['.xlsx', '.xlsb', '.xlsm', '.xls'],
		};
	},
	computed: mapGetters(['file1', 'file2']),
	methods: {
		checkedButton() {
			if (this.$refs.file1.files[0] && this.$refs.file2.files[0]) {
				this.nextBtn = false;
			} else {
				this.nextBtn = true;
			}
		},
		upload1(event) {
			this.readFile(event, 'file1');
		},
		upload2(event) {
			this.readFile(event, 'file2');
		},
		async readFile(event, fileNumber) {
			this.checkedButton();
			const files = event.target.files;
			// ловим все false, undefined и тд
			if (!files || files.length == 0) return;
			const file = files[0];

			const reader = new FileReader();

			reader.onload = (e) => {
				// get data
				const bytes = new Uint8Array(e.target.result);

				/* read workbook */
				const workbook = read(bytes);

				/* grab first sheet */
				const wsname = workbook.SheetNames[0];
				const ws = workbook.Sheets[wsname];

				/* generate HTML */
				const rows = utils.sheet_to_json(ws);

				this.postDataToVuex(fileNumber, rows);
			};
			reader.readAsArrayBuffer(file);
		},
		postDataToVuex(fileNumber, rows) {
			// отправка данных в vuex (название мутации, объект с данными)
			this.$store.commit('setFileData', {
				fileNumber: fileNumber,
				newFileData: {
					file: this.$refs[fileNumber].files[0],
					table: {
						rows: rows,
					},
				},
			});
		},
		vieiwic(rows) {
			console.log(rows);
		},
	},
	mounted: function () {
		this.$refs.file1.name = this.file1.file;
		this.$refs.file2.name = this.file2.file;
	},
};
</script>

<style lang="scss" scoped>
%center-display {
	display: flex;
	justify-content: center;
	align-items: center;
}

%buttons-styles {
	border-radius: 5rem;
	border: none;
	width: 35.5rem;
	height: 7rem;
	font-size: 2rem;
	color: #ffff;
	margin: 7rem 0;
}

.imgBlock {
	@extend %center-display;
}
.btnBlock {
	@extend %center-display;
	gap: 8.5rem;

	.firstBtn {
		cursor: pointer;
		height: 3rem;
		padding: 2rem 2rem;
		@extend %buttons-styles;
		background-color: #2d96ed;
	}
	.secondBtn {
		cursor: pointer;
		height: 3rem;
		padding: 2rem 2rem;
		@extend %buttons-styles;
		background-color: #46cc6b;
	}
}

.nextPage {
	@extend %center-display;
	.nextLink {
		width: fit-content;
		height: fit-content;
		.nextBtn {
			@extend %buttons-styles;
			margin: 0;
			font-size: 4rem;
			cursor: pointer;
			background: rgba(43, 43, 43);
			transition: all 0.5s ease;
		}
		.nextBtn:hover {
			background: rgba(43, 43, 43, 0.79);
		}
		.nextBtn:disabled {
			background: rgba(43, 43, 43, 0.5);
		}
	}
}
.repos {
	@extend %center-display;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin-bottom: 2rem;
	gap: 3rem;
	.git:hover {
		animation: rotate 0.5s ease-in-out;
	}
	.gitlab:hover {
		animation: shake 0.5s ease-in-out;
	}
}

//  ----------------- Animation -----------------------
@keyframes shake {
	0% {
		-webkit-transform: rotate(0);
		transform: rotate(0);
	}

	33% {
		-webkit-transform: rotate(-0.1turn);
		transform: rotate(-0.1turn);
	}

	66% {
		-webkit-transform: rotate(0.1turn);
		transform: rotate(0.1turn);
	}

	100% {
		-webkit-transform: rotate(0);
		transform: rotate(0);
	}
}

@keyframes rotate {
	0% {
		-webkit-transform: rotate(0);
		transform: rotate(0);
	}

	100% {
		-webkit-transform: rotate(-1turn);
		transform: rotate(-1turn);
	}
}
</style>
