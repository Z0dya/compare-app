<template>
    <li>
        <select v-model="atribute">
            <option value="Unset">не выбрано</option>
            <option v-for="option in options" v-bind:key="option + Math.random()" :value="option">
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
            atribute: '',
        };
    },
    computed: mapGetters(['file1', 'file2']),
    watch: {
        atribute() {
            this.$store.dispatch('selectField', {
                fileNumber: this.fileNumber,
                indexOfSelect: this.indexOfSelect,
                valueOfAtribute: this.atribute,
            });
        },
    },
    props: {
        options: Array,
        fileNumber: String,
        indexOfSelect: Number,
    },
    mounted() {
        if (this.options[this.indexOfSelect] !== undefined) {
            this.atribute = this.options[this.indexOfSelect];
        } else {
            this.atribute = 'Unset';
        }
        
    },
};
</script>

<style lang="scss"></style>
