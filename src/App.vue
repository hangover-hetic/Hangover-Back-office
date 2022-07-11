<template>
    <div id="app">
        <router-view :key="$route.path" />
    </div>
</template>

<script>
export default {
    mounted() {},

    methods: {},
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import '~pretty-checkbox/src/pretty-checkbox.scss';
@import './assets/style/fonts.scss';

html {
    min-height: 100vh;
    background-color: #202020;
    margin-left: 10%;
}
</style>
