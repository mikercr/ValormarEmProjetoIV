<template>
<div class="style">
  <v-btn color="primary" dark class="mb-2" href="/evento">Voltar aos Eventos </v-btn>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Identificação dos Operadores</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Identificação do Tipo de Evento</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">Detalhes do Evento</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 4" step="4">Produto de Entrada</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 5" step="5">Produto de Saída</v-stepper-step>
    </v-stepper-header>

    <!-- Etapa 1 ***************************************************************************** -->
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="3" md="6">
                <v-select
                  :items="Operator"
                  :item-text="Operator=>Operator.OperatorId + ' - ' + Operator.operatorName"
                  item-value="OperatorId"
                  label="Operador de Início"
                  v-model="OperadorInicio"
                ></v-select>
              </v-col> 
            </v-row>

            <v-row>
              <v-col cols="12" sm="3" md="6">
                <v-select
                  :items="Operator"
                  :item-text="Operator=>Operator.OperatorId + ' - ' + Operator.operatorName"
                  item-value="OperatorId"
                  label="Operador de Destino" 
                  v-model="OperadorFim"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="3" md="6">
                <v-text-field append-icon="mdi-map-marker" label="Localização do Evento" v-model="localizacao"></v-text-field>
              </v-col>
            </v-row>

          </v-form>
        </v-card>

        <v-btn color="blue darken-1" text @click="e1 = 2">Continuar</v-btn>
      </v-stepper-content>

      <!-- Etapa 2 ***************************************************************************** -->
      <v-stepper-content step="2">
        <v-card class="mb-12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="3" md="6">
                <v-select
                  :items="TypeEvent"
                  :item-text="TypeEvent=>TypeEvent.eventTypeId + ' - ' + TypeEvent.eventTypeName"
                  item-value="eventTypeId"
                  label="Tipo de Evento"
                  v-model="TipoEvento"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <v-btn color="blue darken-1" text @click="e1 = 3">Continuar</v-btn>
        <v-btn text @click="e1 = 1">Voltar</v-btn>
      </v-stepper-content>

      <!-- Etapa 3 ***************************************************************************** -->
      <v-stepper-content step="3">
        <v-card class="mb-12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="3" md="6">
                <date-picker v-model="dataInicio" format="DD/MM/YYYY" placeholder="Data e Hora de Início"></date-picker>
                <br><br>
                <date-picker v-model="dataFim" format="DD/MM/YYYY" placeholder="Data e Hora de Fim"></date-picker>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <v-btn color="blue darken-1" text @click="e1 = 4">Continuar</v-btn>
        <v-btn text @click="e1 = 2">Voltar</v-btn>
      </v-stepper-content>

      <!-- Etapa 4 ***************************************************************************** -->
      <v-stepper-content step="4">
        <v-card class="mb-12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="3" md="6">
                <h5>Lote(s) já existe(m)? </h5>
                <v-switch v-model="switch1"></v-switch>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row v-if="switch1">
              <v-col cols="12" sm="3" md="2">
                <h5>Escolha o(s) lote(s):</h5>
              </v-col>
              <v-data-table
                v-model="inputLots"
                :headers="headers"
                :items="Lot"
                item-key="lotId"
                show-select
                class="elevation-1"
              ></v-data-table>
            </v-row>

            <div v-else>
              <v-row>
                <v-col cols="12" sm="3" md="2">
                  <h5>Criar Lote(s):
                    <v-btn class="mx-2" fab dark small color="primary" @click="addItem()">
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                  </h5>
                  
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <table id="table" class="table">
                    <tbody>
                      <tr v-for="(row, index) in rows" :key="row.id">
                        <td>Lote {{index+1}} </td>
                        <td>
                          <v-select :items="Product" :item-text="Product=>Product.productId + ' - ' + Product.productFishName" item-value="productId" label="Produto Id" v-model="row.valor"></v-select>
                        </td>
                        <td><v-icon @click="deleteItem(index)">mdi-delete</v-icon></td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </div>
          </v-form>
        </v-card>

        <v-btn color="blue darken-1" text @click="e1 = 5">Continuar</v-btn>
        <v-btn text @click="e1 = 3">Voltar</v-btn>
      </v-stepper-content>

      <!-- Etapa 5 ***************************************************************************** -->
      <v-stepper-content step="5">
        <v-card class="mb-12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Output Lots" v-model="outputLots"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <v-btn color="blue darken-1" text @click="criarEvento()">Continuar</v-btn>
        <v-btn text @click="e1 = 4">Voltar</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</div>
</template>

<script>
import axios from 'axios'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueJwtDecode from "vue-jwt-decode";

  export default {
    components: { DatePicker },
    data: () => ({
      user: {},
      //Mudar página
      e1: 1,
      dialog: false,
      //Operador
      Operator: [],
      OperadorInicio: "",
      OperadorFim: "",
      //Tipo Evento
      TypeEvent: [],
      TipoEvento: "",
      //Produto
      Product: [],
      Produto: "",
      //Lot
      rows: [{valor: ""}],
      switch1: false,
      switch2: false,
      Lot: [],
      inputLots: [],
      outputLots: 0,
      headers: [
      {
        text: 'Id Lot',
        align: 'start',
        sortable: false,
        value: 'lotId',
      },
      { text: 'Id Produto', value: 'productId' },
      ],
      //Variáveis para informação
      dataInicio: "",
      dataFim: "",
      localizacao: []
    }),
    mounted() {
      this.fetchItems()
    },
    created () {
      this.getUserDetails(),
      fetchItems()
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      getUserDetails() {
        let token = localStorage.getItem("jwt");
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      },
      fetchItems() {
        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/operator/getOperator')
          .then(response => {this.Operator = response.data
            console.log("Vou enviar os dados:" + this.Operator)
        })

        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/eventType/getEventType')
          .then(response => {this.TypeEvent = response.data
            console.log("Vou enviar os dados:" + this.TypeEvent)
        })

        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Product/getProduct')
                .then(response => {this.Product = response.data
                  console.log("Vou enviar os dados:" + this.Product)
        })

        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/lot/getLot')
                .then(response => {this.Lot = response.data
                  console.log("Vou enviar os dados:" + this.Lot)
        })
      },
      voltarPagina() {
        this.$router.push("/evento")
      },
      criarEvento() {
        axios.post("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/event/newEvent", {
          userId: 1,
          operatorOriginId: this.OperadorInicio,
          operatorDestinyId: this.OperadorFim,
          eventTypeId: this.TipoEvento,
          startTimeStamp: this.dataInicio,
          endTimeStamp: this.dataFim,
          eventInformation: [{
            eventInfoFieldId: 1,
            eventInfoFieldValue: "55º",
            eventInfoTimestamp: "12/07/2021"
          }],
          inputLots: this.inputLots,
          outputLots: this.outputLots,
          eventLocation: {
            coordinates: this.localizacao
          }
        }).then(response => {
          console.log("Novo Evento foi criado!!")
          this.$router.push("/evento")
        });
      },
      //Adicionar item a mais info -----------------------------------------------------------------------
      addItem() {
            this.rows.push({campo:"", valor:""});
      },
      //Remover item a mais info -----------------------------------------------------------------------
      deleteItem(index) {
        if (confirm("Tem a certeza que pretende remover?")) {
          this.rows.splice(index,1);
        }   
      },
      customFormatter(date) {
        return moment(date).format('dd/MM/yyyy');
      }
    }
  }
</script>
<style lang="scss" scoped>
.style{
    width: 95%;
     margin: auto;
}
</style>