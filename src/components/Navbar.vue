<script>

export default {
    name : "TheNavbar",
}
</script>

<template>
    <div class="navbar">
        <nav>
            <div id="logo" />
            <a href="#">
                <span class="fa-solid fa-building size"></span>
            </a>
            <a href="#">
                <span class="fa-solid fa-display size"></span>
            </a>
            <a href="#">
                <span class="fa-solid fa-user-group size"></span>
            </a>
            <a href="#">
                <span class="fa-solid fa-circle-user size"></span>
            </a>
            <a href="#">
                <span class="size-arrow-bottom fa-solid fa-arrow-right-from-bracket"></span>
            </a>
        </nav>
    </div>
</template>

<style scoped>
    body {
        margin: 0;
        padding: 0;
    }

    nav {
        display: block;
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        padding: 0,5em;
        z-index: 1;
        height: 100vh;
        background: #555;
        overflow: hidden;
    }

    nav #logo {
        background: #ff6600;
        height: 4rem;
        line-height: 4rem;
        padding-left: 0.7rem;
    }

    nav a {
        color: #EEE;
        text-decoration: none;
        display: table;
        width: 70px;
    }
    nav a .fa {
        width: 10rem;
        display: table-cell;
        font-size: 2rem;
        padding: 1rem 0;
        text-align: center;
    }
    .size {
        width: 4rem;
        display: table-cell;
        font-size: 2rem;
        padding: 1rem 0;
        text-align: center;
    }

    a:hover {
        background-color: rgb(145, 143, 143);
    }
    .size-arrow-bottom {
        width: 4rem;
        display: table-cell;
        font-size: 2rem;
        padding: 1rem 0;
        text-align: center;
        position: fixed;
        bottom: 0;
    }
    .size-arrow-bottom:hover{
        background-color: rgb(145, 143, 143);
    }
</style>
