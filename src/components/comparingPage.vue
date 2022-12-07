<template>
    <div class="container">
        <div class="imgBlock">
            <img src="../assets/ab-testing 1.svg" alt="compareLogo" />
        </div>
        <div class="compareParam">
            <div class="leftParams">
                <h1 v-on:click="rowsInfo()">{{ file1.file.name }}</h1>

                <!-- перебор на основе длинны столбцов  -->
                <create-selects
                    v-for="(select, indexOfSelect) in maxElementsInFiles"
                    :options="Object.keys(file1.table.rows[0])"
                    :indexOfSelect="indexOfSelect"
                    fileNumber="file1"
                    v-bind:key="'file1' + select"
                ></create-selects>
            </div>
            <div class="rightParams">
                <h1>{{ file2.file.name }}</h1>
                <create-selects
                    v-for="(select, indexOfSelect) in maxElementsInFiles"
                    :options="Object.keys(file2.table.rows[0])"
                    :indexOfSelect="indexOfSelect"
                    fileNumber="file2"
                    v-bind:key="'file2' + select"
                ></create-selects>
            </div>
        </div>
        <div class="btnBlock">
            <div class="next">
                <router-link to="/result" class="nextLink">
                    <button class="nextBtn" @click="compareCall">Далее</button>
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
import { mapGetters } from 'vuex';
import createSelects from './createSelects.vue';
export default {
    components: { createSelects },
    methods: {
        compareCall() {
            this.$store.dispatch('compare');
        },
    },
    // берет данные из getters
    // приходит 1 файл, 2 файл, максимальное кол-во столбцов среди 2-ух файлов
    computed: mapGetters(['file1', 'file2', 'maxElementsInFiles', 'comparedFields']),
};
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
        width: 90%;
    }
    li {
        list-style-type: decimal;
    }

    h1 {
        text-align: center;
    }
}

.container {
    // width: 160rem;
    margin-top: 5rem;
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
