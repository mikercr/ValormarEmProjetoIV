
<template>

<div class="style">

  <v-data-table
    :headers="headers"
    :items="Operator"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
         <br>
      <v-toolbar flat color="white">
        
        <v-toolbar-title>Operador: </v-toolbar-title>
         <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Novo Operador</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.operatorName" label="Name"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.OperatorId" label="Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.operatorContactId" label="Contacto"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.operatorNIF" label="Nif"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        medium
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        medium
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

 
  </v-data-table>
  <br><br><br>
</div>
</template>

<script>
import axios from 'axios'

  export default {
    data: () => ({
      search: '',
      dialog: false,
      headers: [
        {
          text: 'Name',
          value: 'operatorName',
        },
        { text: 'Id', value: 'OperatorId' },
        { text: 'Contacto', value: 'operatorContactId'},
        { text: 'NIF', value: 'operatorNIF'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      Operator: [],
      editedIndex: -1,
      editedItem: {
        operatorName: '',
        OperatorId: '',
        operatorContactId: '',
        operatorNIF: ''
      },
      defaultItem: {
        operatorName: '',
        OperatorId: '',
        operatorContactId: '',
        operatorNIF: ''
      },
    }),
    mounted() {
       this.fetchItems()
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
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
      },

      editItem (item) {
        this.editedIndex = this.Operator.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const { Operator } = this.Operator.indexOf(item)
        console.log(item.OperatorId)
        if (confirm("Do you really want to delete?")) {
          axios.delete("http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/deleteOperator",
              {data : {operatorId: item.OperatorId}})
              .then(response => {
                this.fetchItems();
          });
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () { 
        if (this.editedIndex > -1) {
          console.log("Editar Operador")
          this.Operator.push(this.editedItem)

          axios.put("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/updateOperator",
              {
                operatorId: this.editedItem.OperatorId, 
                operatorName: this.editedItem.operatorName,
                operatorContactId: this.editedItem.operatorContactId,
                operatorNIF: this.editedItem.operatorNIF
              })
              .then(response => {
                this.fetchItems();
          });

        } else {
          console.log("Criar Operador")
          this.Operator.push(this.editedItem)
          
          axios.post("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/newOperator",
              {
                operatorId: this.editedItem.OperatorId, 
                operatorName: this.editedItem.operatorName,
                operatorContactId: this.editedItem.operatorContactId,
                operatorNIF: this.editedItem.operatorNIF
              })
              .then(response => {
                this.fetchItems();
          });
        }
        this.close()
      },
    },
  }
</script>
<style lang="scss" scoped>
.style{
    width: 95%;
     margin: auto;
}
</style>