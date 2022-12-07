<template>
    <div class="container">
        <h1 class="title">Результат сравнения:</h1>
        <div class="box">
            <div class="tableResult">
                <p class="goodAnswer" v-if="goodAnswer">{{ goodAnswer }}</p>
                {{ unMatched }}
                <br />
                <span class="compareHalf"> {{ unmatchedHighlight }}</span>
                {{ unMatched2 }}
                <hr />
                {{ noResults }}
                <br />
                <span class="compareNot" v-if="noResults"> {{ 'Отсутствует в файле:' }}</span>

                {{ nameFile1 }}
                <br />
                {{ noResults2 }}
                <br />
                <span class="compareNot" v-if="noResults2"> {{ 'Отсутствует в файле:' }}</span>
                {{ nameFile2 }}
                <br />
            </div>
        </div>
        <div class="btnBlock">
            <div class="download">
                <button class="downloadBtn">Скачать</button>
            </div>
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
export default {
    computed: mapGetters([
        'unMatched',
        'unMatched2',
        'unmatchedHighlight',
        'noResults',
        'noResults2',
        'nameFile1',
        'nameFile2',
        'goodAnswer',
        'nameOfMatches',
    ]),
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
        .goodAnswer {
            @extend %center-display;
        }
        .compareHalf {
            color: #844aff;
        }
        .compareNot {
            color: #d10c0c;
        }
    }
}

.download {
    .downloadBtn {
        @extend %buttons-styles;
        background-color: #0fbe3f;
        transition: all 0.5s ease;
    }
    .downloadBtn:hover {
        background: rgba(15, 190, 63, 0.8);
    }
}
</style>
