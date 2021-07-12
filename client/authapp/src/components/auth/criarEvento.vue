<template>
<div class="style">
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

            <v-col cols="12" sm="3" md="6">
              <v-select
                :items="Operator"
                :item-text="Operator=>Operator.OperatorId + ' - ' + Operator.operatorName"
                item-value="OperatorId"
                label="Operador de Destino" 
                v-model="OperadorFim"
              ></v-select>
            </v-col>
          </v-form>
        </v-card>

        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
      </v-stepper-content>

      <!-- Etapa 2 ***************************************************************************** -->
      <v-stepper-content step="2">
        <v-card class="mb-12" height="300px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col cols="12" sm="3" md="6">
              <v-select
                :items="TypeEvent"
                :item-text="TypeEvent=>TypeEvent.eventTypeId + ' - ' + TypeEvent.eventTypeName"
                item-value="eventTypeId"
                label="Tipo de Evento"
                v-model="TipoEvento"
              ></v-select>
            </v-col>
          </v-form>
        </v-card>

        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
        <v-btn text @click="e1 = 1">Cancel</v-btn>
      </v-stepper-content>

      <!-- Etapa 3 ***************************************************************************** -->
      <v-stepper-content step="3">
        <v-card class="mb-12" height="300px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col cols="12" sm="3" md="6">
              <v-text-field label="Localização" v-model="localizacao"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="6">
            </v-col>
          </v-form>
        </v-card>

        <v-btn color="primary" @click="e1 = 4">Continue</v-btn>
        <v-btn text @click="e1 = 2">Cancel</v-btn>
      </v-stepper-content>

      <!-- Etapa 4 ***************************************************************************** -->
      <v-stepper-content step="4">
        <v-card class="mb-12" height="300px">
          <v-form ref="form" v-model="valid" lazy-validation>
          </v-form>
        </v-card>

        <v-btn color="primary" @click="e1 = 5">Continue</v-btn>
        <v-btn text @click="e1 = 3">Cancel</v-btn>
      </v-stepper-content>

      <!-- Etapa 5 ***************************************************************************** -->
      <v-stepper-content step="5">
        <v-card class="mb-12" height="300px">
          <v-form ref="form" v-model="valid" lazy-validation>
          </v-form>
        </v-card>

        <v-btn color="primary" @click="criarEvento()">Continue</v-btn>
        <v-btn text @click="e1 = 4">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</div>
</template>

<script>
import axios from 'axios'

  export default {
    data: () => ({
      e1: 1,
      Operator: [],
      OperadorInicio: "",
      OperadorFim: "",
      TypeEvent: [],
      TipoEvento: ""
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
      criarEvento() {
        alert("Fim")
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