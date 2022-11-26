<template>
	<div class="container">
		<div class="imgBlock">
			<img src="../assets/ab-testing 1.svg" alt="compareLogo" />
		</div>
		<div class="compareParam">
			<div class="leftParams">
				<h1>Excel file #1 ...</h1>
				<select id="LeftSelect#1">
					<option value="Unset">Не выбрано</option>
					<option value="Unset">Нэма</option>
				</select>
				<select id="LeftSelect#2">
					<option value="Unset">Не выбрано 2</option>
					<option value="Unset">Пуста</option>
				</select>
				<select id="LeftSelect#3">
					<option value="Unset">Не выбрано 3</option>
					<option value="Unset">Хнык</option>
				</select>
			</div>
			<div class="rightParams">
				<h1>Excel file #2 ...</h1>
				<select id="LeftSelect#1">
					<option value="Unset">Не выбрано</option>
				</select>
				<select id="LeftSelect#2">
					<option value="Unset">Не выбрано 2</option>
				</select>
				<select id="LeftSelect#3">
					<option value="Unset">Не выбрано 3</option>
				</select>
			</div>
		</div>
		<div class="btnBlock">
			<div class="next">
				<router-link to="/result" class="nextLink">
					<button class="nextBtn">Далее</button>
				</router-link>
			</div>
			<div class="back">
				<router-link to="/" class="nextLink">
					<button class="backBtn">Назад</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
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
	cursor: pointer;
	transition: all 0.5s ease;
	font-size: 3rem;
}
%text-sizing {
	select {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}
	h1 {
		text-align: center;
	}
}

.container {
	// width: 160rem;
	margin: 0;
}

.imgBlock {
	@extend %center-display;
}
.imgBlock img {
	@extend %center-display;
	width: 28.8rem;
}
.compareParam {
	@extend %center-display;
	@extend %text-sizing;
	gap: 30rem;
	font-size: 2rem;
	.leftParams {
		width: 35rem;
		display: flex;
		flex-direction: column;
	}
	.rightParams {
		width: 35rem;
		display: flex;
		flex-direction: column;
	}
}

.btnBlock {
	@extend %center-display;
	gap: 30rem;
	.next {
		margin: 0;
		.nextBtn {
			@extend %buttons-styles;
			background-color: #ce2955;
		}
		.nextBtn:hover {
			background: rgba(206, 41, 85, 0.8);
		}
	}
	.back {
		.backBtn {
			@extend %buttons-styles;
			background-color: #844aff;
		}
		.backBtn:hover {
			background: rgba(132, 74, 255, 0.8);
		}
	}
}
</style>
