<template>
<div class="style">
  <v-data-table
    :headers="headers"
    :items="Operator"
    :search="search"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="OperatorId"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <br>
      <v-toolbar flat color="white">
        <v-toolbar-title>Operadores: </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Procurar"
          hide-details
        ></v-text-field>

        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-btn color="primary" dark class="mb-2" href="/criarOperador">Novo Operador</v-btn>
      </v-toolbar>
    </template>
 
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <br>
        <h6>Mais Informações:</h6>
        <ul v-for="info in OperatorInfo" :key="info.operatorInfoId">
          <li v-if="info.operatorId == item.OperatorId">
              {{info.operatorInfoKey}}:  {{info.operatorInfoValue}}
          </li>
        </ul>
      </td>
    </template>
  </v-data-table>
  <br><br><br>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      expanded: [],
      singleExpand: true,
      search: '',
      headers: [
        {
          text: 'Id', 
          value: 'OperatorId',
          align: 'start',
          sortable: false,
     
        },
        { text: 'Name', value: 'operatorName',},
        { text: 'Contacto', value: 'operatorContactId'},
        { text: 'Parent', value: 'operatorParentId'},
        { text: 'NIF', value: 'operatorNIF'},
        { text: 'Localização', value: 'operatorLocation.coordinates'},
        { text: 'Actions', value: 'actions', sortable: false },
        { text: 'Mais dados', value: 'data-table-expand' }
      ],
      Operator: [],
      OperatorInfo: [],
      editedIndex: -1,
      editedItem: {
        OperatorId: '',
        operatorName: '',
        operatorContactId: '',
        operatorParentId: '',
        operatorNIF: '',
        operatorLocation: {
          coordinates: ''
        }
      },
      defaultItem: {
        OperatorId: '',
        operatorName: '',
        operatorContactId: '',
        operatorParentId: '',
        operatorNIF: '',
        operatorLocation: {
          coordinates: ''
        }
      },
      editedItemInfo: {
        operatorInfoKey: '',
        operatorInfoValue: ''
      },
      defaultItemInfo: {
        operatorInfoKey: '',
        operatorInfoValue: ''
      },
    }),
    mounted() {
      this.fetchItems()
    },
    created () {
      this.fetchItems()
    },

    methods: {
      fetchItems(){
        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/getOperator')
                .then(response => {this.Operator = response.data
                  console.log("Vou enviar os dados:" + this.Operator)
        })

        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/operatorInfo/getOperatorInfo')
                .then(response => {this.OperatorInfo = response.data
                  console.log("Vou enviar os dados:" + this.OperatorInfo)
        })
      },

      editItem (item) {
        //alert("Teste" + item.OperatorId)
        this.$router.push({name: 'editarOperador', params: {idOperador: item.OperatorId}})
      },

      deleteItem (item) {
        const { Operator } = this.Operator.indexOf(item)
        if (confirm("Tem a certeza que pretende remover?")) {
          axios.delete("http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/deleteOperator",
              {data : {operatorId: item.OperatorId}})
              .then(response => {
                this.fetchItems(),
                swal("Operador removido com Sucesso!", "", "info")
          });
        }
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