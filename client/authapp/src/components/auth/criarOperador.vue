<template>
<div class="container">
    <v-card elevation="2" max-width="90%">
        <v-card-title>Criar Operador</v-card-title>
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
                        <v-select :items="items" label="Sucursal" v-model="sucursalOperador"></v-select>
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
                            <tr v-for="row in rows" :key="row">
                                <td>
                                    <v-text-field label="Campo" v-model="row.campo"></v-text-field>
                                </td>
                                <td>
                                    <v-text-field label="Valor" v-model="row.valor"></v-text-field>
                                </td>
                                <td>
                                    <v-icon @click="deleteItem(row)">mdi-delete</v-icon>
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
        rows: [{campo: "", valor: ""}],
        items: [],
        nomeOperador: "",
        nifOperador: "",
        contactoOperador: "",
        localizacao: [""],
        sucursalOperador: ""
    }),
    methods: {
        addItem() {
            this.rows.push({campo:"", valor:""});
        },
        deleteItem(row) {
            //alert(row);
            //this.rows.$remove(row);
            //document.getElementById("table").deleteRow(row);
        },
        close() {
            window.history.back();
        },
        save() {
            //console.log(this.rows[0].campo + this.rows[0].valor)
            //console.log(this.rows.length)

            axios.post("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/newOperator", {
                operatorName: this.nomeOperador,
                operatorContactId: this.contactoOperador,
                operatorParentId: this.sucursalOperador,
                operatorNIF: this.nifOperador,
                operatorLocation: {
                    coordinates: this.localizacao
                },
                operatorInfo: [{
                    operatorInfoKey: this.rows[0].campo,
                    operatorInfoValue: this.rows[0].valor
                }]
            }).then(response => {
                console.log("Novo Operador foi criado!!");
                window.history.back();
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
