<template>
    <div class="container">
        <div class="imgBlock">
            <img src="../assets/ab-testing 1.svg" alt="compareLogo" />
        </div>
        <div class="btnBlock">
            <label class="firstBtn" for="input1">
                <input
                    type="file"
                    class="inputs"
                    placeholder="Загрузить 1 файл"
                    ref="file1"
                    @change="upload1"
                    :accept="AvailableFormats"
                    id="input1"
                />
                <span v-if="file1Name">{{ file1Name }}</span>
                <span v-else>Выберите файл 1</span>
            </label>
            <label class="secondBtn" for="input2">
                <input
                    type="file"
                    class="inputs"
                    placeholder="Загрузить 2 файл"
                    ref="file2"
                    @change="upload2"
                    :accept="AvailableFormats"
                    id="input2"
                />
                <span v-if="file2Name">{{ file2Name }}</span>
                <span v-else>Выберите файл 2</span>
            </label>
        </div>

        <div class="nextPage">
            <router-link to="/comparing" class="nextLink">
                <!-- изначально значение у кнопки "отключено" - истина -->
                <button class="nextBtn" ref="next" :disabled="nextBtn">Далее</button>
            </router-link>
        </div>
        <div class="repos">
            <a href="https://github.com/Z0dya/compare-app" target="_blank">
                <img src="../assets/Git (1).svg" alt="gitIco" class="git"
            /></a>
            <a href="https://git.informunity.ru/study/lazutkin-compare-app" target="_blank">
                <img src="../assets/gitlab 1 (1).svg" alt="gitlabIco" class="gitlab"
            /></a>
        </div>
    </div>
</template>

<script>
import { read, utils } from 'xlsx';
import { mapGetters } from 'vuex';
export default {
    computed: mapGetters(['file1Name', 'file2Name']),
    name: 'App',
    data: function () {
        return {
            // изначально значение у кнопки "отключено" - истина
            nextBtn: true,
            // доступные форматы для загрузки файлов
            AvailableFormats: ['.xlsx', '.xlsb', '.xlsm', '.xls'],
        };
    },
    methods: {
        // проверка загрузил ли юзер оба файла, чтобы кнопка далее активировалась
        checkedButton() {
            if (this.$refs.file1.files[0] && this.$refs.file2.files[0]) {
                this.nextBtn = false;
            } else {
                this.nextBtn = true;
            }
        },
        // вызывает функцию для записи в конкретный объект
        upload1(event) {
            this.readFile(event, 'file1');
        },
        // вызывает функцию для записи в конкретный объект
        upload2(event) {
            this.readFile(event, 'file2');
        },
        // функция записи в input файла (sheet js)
        async readFile(event, fileNumber) {
            this.checkedButton();
            const files = event.target.files;
            // ловим все false, undefined и тд
            if (!files || files.length == 0) return;
            const file = files[0];

            const reader = new FileReader();

            reader.onload = (e) => {
                // get data
                const bytes = new Uint8Array(e.target.result);

                /* read workbook */
                const workbook = read(bytes);

                /* grab first sheet */
                const wsname = workbook.SheetNames[0];
                const ws = workbook.Sheets[wsname];

                /* generate HTML */
                const rows = utils.sheet_to_json(ws);

                this.postDataToVuex(fileNumber, rows);
            };
            reader.readAsArrayBuffer(file);
        },
        postDataToVuex(fileNumber, rows) {
            // отправка данных в vuex payload (название мутации, объект с данными)
            this.$store.dispatch('loadFileInformation', {
                fileNumber: fileNumber,
                newFileData: {
                    file: this.$refs[fileNumber].files[0],
                    table: {
                        rows: rows,
                    },
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
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
    font-size: 3.5rem;
    color: #ffff;
    margin: 7rem 0;
}
%continue {
    border-radius: 5rem;
    border: none;
    width: 25.5rem;
    height: 7rem;
    font-size: 4rem;
    color: #ffff;
    margin: 7rem 0;
}

.container {
    margin-top: 5rem;
    .imgBlock {
        @extend %center-display;
    }
    .btnBlock {
        @extend %center-display;
        gap: 8.5rem;

        .firstBtn {
            @extend %center-display;
            cursor: pointer;
            height: 3rem;
            padding: 2rem 2rem;
            @extend %buttons-styles;
            background-color: #2d96ed;
        }
        .secondBtn {
            @extend %center-display;
            cursor: pointer;
            height: 3rem;
            padding: 2rem 2rem;
            @extend %buttons-styles;
            background-color: #46cc6b;
        }
    }
}

.inputs {
    display: none;
}

span {
    padding-bottom: 0.5rem;
}
.nextPage {
    @extend %center-display;
    .nextLink {
        width: fit-content;
        height: fit-content;
        .nextBtn {
            @extend %continue;
            margin: 0;
            cursor: pointer;
            background: rgba(43, 43, 43);
            transition: all 0.5s ease;
        }
        .nextBtn:hover {
            background: rgba(43, 43, 43, 0.79);
        }
        .nextBtn:disabled {
            background: rgba(43, 43, 43, 0.5);
        }
    }
}
.repos {
    @extend %center-display;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 2rem;
    gap: 3rem;
    .git:hover {
        animation: rotate 0.5s ease-in-out;
    }
    .gitlab:hover {
        animation: shake 0.5s ease-in-out;
    }
}
//  ----------------- Animation -----------------------
@keyframes shake {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }

    33% {
        -webkit-transform: rotate(-0.1turn);
        transform: rotate(-0.1turn);
    }

    66% {
        -webkit-transform: rotate(0.1turn);
        transform: rotate(0.1turn);
    }

    100% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }
}

@keyframes rotate {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }

    100% {
        -webkit-transform: rotate(-1turn);
        transform: rotate(-1turn);
    }
}

// адаптивный дизайн
@media (max-height: 740px) {
    .imgBlock img {
        width: 20rem;
    }

    %continue {
        border-radius: 5rem;
        border: none;
        width: 20.5rem;
        height: 6rem;
        font-size: 3rem;
        color: #ffff;
        margin: 0;
    }

    %buttons-styles {
        border-radius: 5rem;
        border: none;
        width: 35.5rem;
        height: 3rem;
        font-size: 3rem;
        color: #ffff;
        margin: 5rem 0;
    }
}
</style>
