<template>
	<select>
		<option value="Unset">Не выбрано</option>
		<option v-for="option in options" v-bind:key="option">{{ option }}</option>
	</select>
</template>

<script>
export default {
	props: {
		options: Array,
	},
};
</script>

<style></style>
