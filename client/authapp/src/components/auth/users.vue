<template>
<div class="style">
  <v-data-table
    :headers="headers"
    :items="user"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
        <br>
      <v-toolbar flat color="white">
        <v-toolbar-title> Utilizadores:</v-toolbar-title>
        <br>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
     
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
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
          value: 'name',
        },
        { text: 'Id', value: '_id' },
        { text: 'Email', value: 'email'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      user: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: ''
      },
      defaultItem: {
         name: '',
        email: ''
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
        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/user/getUsers')
                .then(response => {this.user = response.data
                  console.log("Vou enviar os dados:" + this.user) 
        })
      },

      editItem (item) {
        this.editedIndex = this.user.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.name = this.editedItem.name
        this.email = this.editedItem.email
        this.dialog = true
      },

      deleteItem (item) {
        const { Operator } = this.user.indexOf(item)
        console.log(item._id)
        if (confirm("Do you really want to delete?")) {
          axios.delete("http://projeto4valormar-iarkc.run-eu-central1.goorm.io/user/",
              {data : {_id: item._id}})
              .then(response => {
                this.fetchItems();
          });
        }
        //location.reload();
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
          /*Object.assign(this.Operator[this.editedIndex], this.editedItem)
          axios.delete(`http://localhost:5000/dessert/${this.editedItem._id}`)
          axios
            .post('http://localhost:5000/dessert', {
            name: this.editedItem.name,
            calories: this.editedItem.calories
            })*/
        } else {
          console.log("Criar Operador")
          this.Operator.push(this.editedItem)

          //console.log(this.editedItem.Name)
          //console.log(this.editedItem.Id)
          //console.log(this.editedItem.Contacto)
          //console.log(this.editedItem.NIF)
          
          axios.post("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/Operator/newOperator",
              {
                operatorId: this.editedItem.Id, 
                operatorName: this.editedItem.Name,
                operatorContactId: this.editedItem.Contacto,
                operatorNIF: this.editedItem.NIF
              })
              .then(response => {
                this.fetchItems();
          });
        }
        this.close()
        //location.reload();
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