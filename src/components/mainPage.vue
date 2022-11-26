<template>
	<div class="container">
		<div class="imgBlock">
			<img src="../assets/ab-testing 1.svg" alt="compareLogo" />
		</div>
		<div class="btnBlock">
			<input type="file" class="firstBtn" placeholder="Загрузить 1 файл" ref="input1" />
			<input type="file" class="secondBtn" placeholder="Загрузить 2 файл" ref="input2" />
		</div>

		<div class="nextPage">
			<router-link to="/comparing" class="nextLink">
				<button class="nextBtn" ref="next">Далее</button>
			</router-link>
		</div>
		<div class="repos">
			<a href="#"> <img src="../assets/Git (1).svg" alt="gitIco" class="git" /></a>
			<a href="#"> <img src="../assets/gitlab 1 (1).svg" alt="gitlabIco" class="gitlab" /></a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'App',
	data: function () {
		return {
			nextBtn: this.$refs.next,
			inputFile1: this.$refs.input1,
			inputFile2: this.$refs.input2,
		};
	},
	methods: {
		checkedButton() {
			if (this.inputFile1.value && this.inputFile2.value) {
				this.nextBtnt.attributes('disabled', false);
			} else {
				this.nextBtn.attributes('disabled', true);
			}
			// :on-change="checkedButton()"
			// disabled
		},
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
