<template>
    <div class="container">
        <h1 class="title">Результат сравнения:</h1>
        <div class="box">
            <div class="tableResult">
                <p class="goodAnswer" v-if="goodAnswer">{{ goodAnswer }}</p>
                <partical-compare
                    v-for="partical in compareResult.partical"
                    :key="Math.random() + partical"
                    :rowInFile0="partical.rowInFile0"
                    :rowInFile1="partical.rowInFile1"
                ></partical-compare>

                <absolute-not-compare
                    v-for="absolute in compareResult.absolute"
                    :key="Math.random() + absolute"
                    :rowInFile0="absolute.rowInFile0"
                    :nameOfFile1="absolute.nameOfFile1"
                ></absolute-not-compare>
            </div>
        </div>
        <div class="btnBlock">
            <div class="back">
                <router-link to="/comparing" class="nextLink">
                    <button class="backBtn">Назад</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AbsoluteNotCompare from './absoluteNotCompare.vue';
import particalCompare from './particalCompare.vue';
export default {
    components: { particalCompare, AbsoluteNotCompare },
    computed: mapGetters(['goodAnswer', 'compareResult', 'compared']),
};
</script>

<style lang="scss">
%center-display {
    display: flex;
    justify-content: center;
    align-items: center;
}

%table {
    width: 111rem;
    height: 60rem;
    border-radius: 5rem;
    border: none;
    background-color: #2b2b2b;
    color: #ffffff;
    font-size: 3rem;
}
.title {
    font-size: 4.2rem;
    @extend %center-display;
}
.box {
    @extend %center-display;
    .tableResult {
        @extend %table;
        padding: 2rem 2rem;
        overflow: scroll;
        .goodAnswer {
            @extend %center-display;
        }
    }
}
.btnBlock {
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

// адаптивный дизайн
@media (max-height: 800px) {
    %table {
        width: 85rem;
        height: 50rem;
        border-radius: 5rem;
        border: none;
        background-color: #2b2b2b;
        color: #ffffff;
        font-size: 3rem;
    }
    %buttons-styles {
        border-radius: 5rem;
        border: none;
        width: 25.5rem;
        height: 5rem;
        color: #ffff;
        margin: 7rem 0;
        cursor: pointer;
        transition: all 0.5s ease;
        font-size: 3rem;
    }

    .btnBlock {
        height: 10rem;
    }
}
@media (max-width: 1180px) {
    %table {
        width: 85rem;
        height: 50rem;
        border-radius: 5rem;
        border: none;
        background-color: #2b2b2b;
        color: #ffffff;
        font-size: 3rem;
    }
    %buttons-styles {
        border-radius: 5rem;
        border: none;
        width: 25.5rem;
        height: 5rem;
        color: #ffff;
        margin: 7rem 0;
        cursor: pointer;
        transition: all 0.5s ease;
        font-size: 3rem;
    }

    .btnBlock {
        height: 10rem;
    }
}
@media (max-height: 700px) {
    %table {
        width: 85rem;
        height: 40rem;
        border-radius: 5rem;
        border: none;
        background-color: #2b2b2b;
        color: #ffffff;
        font-size: 3rem;
    }
    %buttons-styles {
        border-radius: 5rem;
        border: none;
        width: 25.5rem;
        height: 5rem;
        color: #ffff;
        margin: 7rem 0;
        cursor: pointer;
        transition: all 0.5s ease;
        font-size: 3rem;
    }

    .btnBlock {
        height: 10rem;
    }
}
</style>
