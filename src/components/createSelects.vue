<template>
    <li>
        <select v-model="atribute" v-on:change="optionSubmit">
            <option value="Unset">Не выбрано</option>
            <option v-for="option in options" v-bind:key="option">
                {{ option }}
            </option>
        </select>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            atribute: 'Unset',
        };
    },
    computed: mapGetters(['file1', 'file2']),
    methods: {
        optionSubmit() {
            // console.log(this.atribute);
            // console.log(this.file1.table.rows[0][`${this.option} `]);
        },
    },
    props: {
        options: Array,
    },
};
</script>

<style lang="scss"></style>
