<template>
    <div class="loader">
        <img :src="loaderImg" alt="" />
    </div>
</template>

<script>
import loaderImg from '../assets/loader.svg';
export default {
    name: 'loader',
    data: function () {
        return {
            loaderImg: loaderImg,
        };
    },
};
</script>

<style lang="scss">
%center-display {
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader {
    @extend %center-display;
}
</style>
