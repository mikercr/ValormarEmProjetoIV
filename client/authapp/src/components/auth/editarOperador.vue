<template>
<div class="container">
    <v-card elevation="2" max-width="90%">
        <v-card-title>Editar Operador - Id: {{$route.params.idOperador}}</v-card-title>
        <v-divider></v-divider>
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Name" v-model="nomeOperador"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="3" md="3">
                        <v-text-field label="Nif" v-model="nifOperador"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                        <v-text-field label="Contacto" v-model="contactoOperador"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="3" md="6">
                        <v-select :items="Operators" :item-text="Operators=>Operators.OperatorId + ' - ' + Operators.operatorName" item-value="OperatorId" label="Sucursal" v-model="sucursalOperador"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="3" md="6">
                        <v-text-field label="Localização" v-model="localizacao"></v-text-field>
                    </v-col>
                </v-row>
                <br>
                <p class="font-weight-bold">
                    Mais Informações:
                    <v-btn class="mx-2" fab dark small color="primary" @click="addItem()">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </p>
                <div class="style">
                    <table id="table" class="table">
                        <tbody>
                            <tr v-for="(row, index) in rows" :key="row.id">
                                <td>
                                    <v-text-field label="Campo" v-model="row.campo"></v-text-field>
                                </td>
                                <td>
                                    <v-text-field label="Valor" v-model="row.valor"></v-text-field>
                                </td>
                                <td>
                                    <v-icon @click="deleteItem(index)">mdi-delete</v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </v-container>
        </v-form>

        <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        rows: [],
        Operators: [],
        Operator: [],
        nomeOperador: "",
        nifOperador: "",
        contactoOperador: "",
        localizacao: [""],
        sucursalOperador: "",
    }),
    mounted() {
        this.fetchItems()
    },
    created () {
        fetchItems()
    },
    methods: {
        fetchItems() {
            axios.get("http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/getOperator")
                .then(response => {this.Operators = response.data
                    console.log("Vou enviar os dados:" + this.Operators)
            });

            axios.get("http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/getOperatorById", 
                {data: { operatorId: "133" }
            }).then(response => {this.Operator = response.data
                console.log("Receber Operador:" + this.Operator)
            });
        },
        addItem() {
            this.rows.push({campo:"", valor:""})
        },
        deleteItem(index) {
            //alert(index);
            this.rows.splice(index,1);
        },
        close() {
            window.history.back();
        },
        save() {
            axios.post("http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/updateOperator", {
                operatorName: this.nomeOperador,
                operatorContactId: this.contactoOperador,
                operatorParentId: this.sucursalOperador,
                operatorNIF: this.nifOperador,
                operatorLocation: {
                    coordinates: this.localizacao
                },
                operatorInfo: this.rows
            }).then(response => {
                console.log("Operador foi Editado!!")
                this.$router.push("/operador")
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    width: 95%;
    margin: auto;
    margin-top: 1%;
}
.style{
    width: 60%;
    margin-top: 1%;
}
</style>