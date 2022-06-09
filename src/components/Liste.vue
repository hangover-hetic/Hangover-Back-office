<template>
    <div class="menu">

        <table>
            <thead>
                <tr>
                    <th align="left">Sélectionner tous les éléments</th>
                    <th align="left">Date</th>
                    <th align="left">Lieu</th>
                </tr>
            </thead>
            <tbody>

                <tr class="categories bibaboup" v-for="item in festivals" :key="item.festivals">



                    <td> <label for="elements">{{
                            item.name
                    }}</label></td>
                    <td>{{ dayjs(item.start_date).format('DD / MM / YYYY') }}</td>
                    <td>{{ item.location }}</td>
                    <td><img src="../assets/img/delete.svg" v-on:click="CallDelete(item.id)" /></td>
                    <td><img src="../assets/img/ecrans.svg" /></td>
                    <td><img src="../assets/img/edit.svg" /></td>

                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
const dayjs = require('dayjs')


export default {
    name: 'ListeBackoffice',

    data() {
        return {
            festivals: '',
            checkbox: true,
            dayjs,
            tab: []


        }
    },

    mounted() {
        this.callNameFestivals();
    },

    methods: {


        callNameFestivals() {
            this.$http
                .get('festivals?page=1', {
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(res => {
                    this.festivals = res.data
                }
                )



        },


        CallDelete(id) {
            console.log(id)
            //this.$http
            //.delete('festivals/' + id)
            //.then(response => {
            //  console.log(response);
            //});
        }
    }
}

</script>




<style scoped lang="scss">
tr {

    th,
    td {
        font-family: 'Poppins', sans-serif;
        color: #FFFFFF;
    }
}


table {
    width: 60%;
    border-collapse: collapse;

    tbody {

        tr {
            display: table-row;
            border-top: 2px solid #707070;


            td {
                padding: 15px 0;

               img{
                   display: flex;
                   align-self: center;

                   &:hover{
                       cursor: pointer
                   }
               }


            }
        }
    }

    thead {
        tr {
            th {
                padding-bottom: 15px;
            }

        }
    }
}
</style>



