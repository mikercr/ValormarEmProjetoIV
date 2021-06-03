<template>
  <v-data-table
    :headers="headers"
    :items="Operator"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Operador</v-toolbar-title>
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Name" label="Nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.NIF" label="Nif"></v-text-field>
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
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>

 
  </v-data-table>
</template>

<script>
import axios from 'axios'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Name',
          value: 'operatorName',
        },
        { text: 'Id', value: 'OperatorId' },
        { text: 'NIF', value: 'operatorNIF'},
        {text: 'Actions', value: 'actions', sortable: false },
      ],
      Operator: [],
      editedIndex: -1,
      editedItem: {
        Name: '',
        NIF: 0,
      },
      defaultItem: {
        name: '',
        NIF: 0,
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
                }
              )
                
            
        },

      editItem (item) {
        this.editedIndex = this.Operator.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.name = this.editedItem.name
        this.NIF = this.editedItem.NIF
        this.dialog = true
      },

      deleteItem (item) {
        const { post } = this.Operator.indexOf(item)
        //this.deletedItem = Object.assign({}, item)
        //consolex.log(this.deletedItem)
        //this.deletedID = this.deletedItem._id
        //console.log(this.deletedID)
        if (confirm("Do you really want to delete?")) {
          axios.delete("http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/deleteOperatorByNif",{params: {id: post.operatorNIF}})
        .then(response => {
            console.log(response);
        });
          this.desserts.splice(index, 1);
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () { // Edit Item
        if (this.editedIndex > -1) {
          Object.assign(this.Operator[this.editedIndex], this.editedItem)
          axios.delete(`http://localhost:5000/dessert/${this.editedItem._id}`)
          axios
            .post('http://localhost:5000/dessert', {
            name: this.editedItem.name,
            calories: this.editedItem.calories
            })

          // New Item
        } else {
          this.Operator.push(this.editedItem)

          axios.post('http://localhost:5000/dessert', {
          name: this.editedItem.name,
          calories: this.editedItem.calories
          })
        }

        this.close()
      },
    },
  }
</script>