<template>
    <div class="content">
        <div class="message404">
            <img src="../assets/bear.svg" alt="404" draggable="false" />
            <div class="text">
                <h2>Мы долго искали, но...</h2>
                <p>Кажется, страница, которую вы ищете не существует</p>
            </div>
        </div>
        <div class="back">
            <router-link to="/" class="nextLink">
                <button class="backBtn">Назад</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
%center {
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
    color: rgb(236, 234, 231);
    margin: 7rem 0;
    cursor: pointer;
    transition: all 0.5s ease;
    font-size: 3rem;
}

%text {
    width: 46.5rem;
    margin: 0 0 15rem 4rem;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #252113;
    color: rgb(236, 234, 231);
    height: 100%;
    width: 100%;
}

.message404 {
    @extend %center;
    padding: 5rem 0;
    .text {
        @extend %text;
        h2 {
            font-size: 4rem;
            font-weight: 700;
        }
        p {
            font-size: 3.2rem;
            font-weight: 500;
        }
    }
}
.back {
    @extend %center;
    .backBtn {
        @extend %buttons-styles;
        background: #78705e;
        transition: all 0.5s ease;
    }
    .backBtn:hover {
        background: rgba(120, 112, 94, 0.7);
    }
}
</style>
