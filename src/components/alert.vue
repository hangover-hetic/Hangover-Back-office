<template>
    <div class="alert">
        <div class="img__succes">
            <img :src="require(`@/assets/img/${img}.svg`)" />
        </div>
        <div class="msg__success">
            <p>{{ msg }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'alertComponent',

    props: {
        msg: String,
        img: String,
    },

    methods: {
        Alert() {
            const success = document.querySelector('.alert')
            success.classList.add('show')

            setTimeout(() => {
                success.classList.remove('show')
            }, 5000)
        },
    },
}
</script>

<style scoped lang="scss">
.alert {
    display: none;
}

.show {
    display: block !important;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    top: 20px;

    .msg__success {
        p {
            margin-top: -5px;
        }
    }
}
</style>
