<template>
    <div class="menu">

        <table>
            <tbody>
                <tr class="categories">
                    <div class="categories__partOne">
                        <td>
                            <v-container class="px-0" fluid>
                                <v-checkbox  v-model="checkbox" :label="`Checkbox 1: ${checkbox.toString()}`">
                                </v-checkbox>
                            </v-container>
                            
                        </td>
                        <td>Date<img src="../assets/img/icon_material-sort.svg" /></td>
                        <td>Lieu<img src="../assets/img/icon_material-sort.svg" /></td>
                    </div>
                    <div class="categories__partTwo">
                        <td><button>Supprimer</button></td>
                    </div>
                </tr>

                <tr class="categories bibaboup" v-for="item in festivals" :key="item.festivals">

                    <div class="categories__partOne">
                        <td> <input type="checkbox" class="elements" name="elements"
                                style="background-color: #000000"><label for="elements">{{ item.name }}</label></td>
                        <td>Date</td>
                        <td>{{ item.location }}</td>
                    </div>
                    <div class="categories__partTwo">
                        <td><button>Supprimer</button></td>
                    </div>
                </tr>

            </tbody>
        </table>

    </div>
</template>

<script>



export default {
    name: 'ListeBackoffice',

    data() {
        return {
            festivals: '',
            checkbox: true,
        }
    },

    mounted() {
        this.callFestivals();
    },

    methods: {


        callFestivals() {
            this.$http
                .get('festivals?page=1', {
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(res => {
                    this.festivals = res.data
                    console.log(this.festivals)

                }
                )

        }
    }
}

</script>




<style scoped lang="scss">
* {
    font-family: 'Poppins', sans-serif;

}

table {
    width: 70%;

    tbody {

        .bibaboup {

            .categories__partOne {
                td:first-child {
                    min-width: 286px;
                }

                td {
                    input {
                        accent-color: #202020
                    }
                }

                td:nth-child(3) {
                    margin-left: 17px;
                }
            }


        }

        .categories {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid white;
            height: 2.5vw;






            .categories__partOne {
                display: flex;
                justify-content: left;
                gap: 10%;
                width: 40%;
                align-items: center;

                td {
                    color: #FFFFFF;

                    img {
                        margin-left: 5px;
                    }

                }
            }

            .categories__partTwo {
                display: flex;
                align-items: center;
                color: #FFFFFF;

            }
        }



    }
}
</style>



