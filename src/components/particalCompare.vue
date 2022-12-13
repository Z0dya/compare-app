<template>
    <div class="partical-compare">
        <p>{{ Object.values(rowInFile0).join(' | ') }}</p>
        <p class="compareHalf">частично совпадает с</p>
        <p>{{ Object.values(rowInFile1).join(' | ') }}</p>
        <hr />
    </div>
</template>

<script>
export default {
    props: {
        rowInFile0: Object,
        rowInFile1: Object,
    },
};
</script>

<style lang="scss">
.compareHalf {
    color: #844aff;
}
</style>
