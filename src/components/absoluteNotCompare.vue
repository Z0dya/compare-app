<template>
    <div class="absolute-compare">
        <p>{{ Object.values(rowInFile0).join(' | ') }}</p>
        <p class="compareNot">Ничего не найдено в файле</p>
        <p>{{ nameOfFile1 }}</p>
        <hr />
    </div>
</template>

<script>
export default {
    props: {
        rowInFile0: Object,
        nameOfFile1: String,
    },
};
</script>

<style lang="scss">
.compareNot {
    color: #d10c0c;
}
</style>
