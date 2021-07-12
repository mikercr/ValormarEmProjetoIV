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
        <v-card class="mb-12" height="300px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="3" md="6">
                <v-select
                  :items="Operator"
                  :item-text="Operator=>Operator.OperatorId + ' - ' + Operator.operatorName"
                  :rules="[() => false]"
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

        <v-btn color="primary" @click="e1 = 2">Continuar</v-btn>
      </v-stepper-content>

      <!-- Etapa 2 ***************************************************************************** -->
      <v-stepper-content step="2">
        <v-card class="mb-12" height="300px">
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

        <v-btn color="primary" @click="e1 = 3">Continuar</v-btn>
        <v-btn text @click="e1 = 1">Voltar</v-btn>
      </v-stepper-content>

      <!-- Etapa 3 ***************************************************************************** -->
      <v-stepper-content step="3">
        <v-card class="mb-12" height="300px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="3" md="6">
                <date-picker v-model="dataInicio" type="datetime" placeholder="Data e Hora de Início" range></date-picker>
                <br><br>
                <date-picker v-model="dataFim" type="datetime" placeholder="Data e Hora de Fim" range></date-picker>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <v-btn color="primary" @click="e1 = 4">Continuar</v-btn>
        <v-btn text @click="e1 = 2">Voltar</v-btn>
      </v-stepper-content>

      <!-- Etapa 4 ***************************************************************************** -->
      <v-stepper-content step="4">
        <v-card class="mb-12" height="300px">
          <v-form ref="form" v-model="valid" lazy-validation>
          </v-form>
        </v-card>

        <v-btn color="primary" @click="e1 = 5">Continuar</v-btn>
        <v-btn text @click="e1 = 3">Voltar</v-btn>
      </v-stepper-content>

      <!-- Etapa 5 ***************************************************************************** -->
      <v-stepper-content step="5">
        <v-card class="mb-12" height="300px">
          <v-form ref="form" v-model="valid" lazy-validation>
          </v-form>
        </v-card>

        <v-btn color="primary" @click="criarEvento()">Continuar</v-btn>
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

  export default {
    components: { DatePicker },
    data: () => ({
      e1: 1,
      Operator: [],
      OperadorInicio: "",
      OperadorFim: "",
      TypeEvent: [],
      TipoEvento: "",
      dataInicio: "",
      dataFim: ""
    }),
    mounted() {
      this.fetchItems()
    },
    created () {
      fetchItems()
    },
    methods: {
      fetchItems() {
        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/operator/getOperator')
          .then(response => {this.Operator = response.data
            console.log("Vou enviar os dados:" + this.Operator)
        })

        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/eventType/getEventType')
          .then(response => {this.TypeEvent = response.data
            console.log("Vou enviar os dados:" + this.TypeEvent)
        })
      },
      voltarPagina() {
        this.$router.push("/evento")
      },
      criarEvento() {
        alert("Fim")
        this.$router.push("/evento")
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