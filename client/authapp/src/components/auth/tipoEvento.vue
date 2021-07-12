<template>
<div class="style">
  <v-data-table :headers="headers" :items="TipoEvento" :search="search" class="elevation-1">
    <template v-slot:top>
      <br>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tipos de Eventos: </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Procurar" single-line hide-details></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Novo Tipo de Evento</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.eventTypeName" label="Nome"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.eventTypeDescription" label="Descrição"></v-text-field>
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
      <v-icon medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon medium class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
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
        { text: 'Id', value: 'eventTypeId' },
        { text: 'Nome', value: 'eventTypeName'},
        { text: 'Descrição', value: 'eventTypeDescription'},
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      TipoEvento: [],
      editedIndex: -1,
      editedItem: {
        eventTypeId: 0,
        eventTypeName: "",
        eventTypeDescription: "",
      },
      defaultItem: {
        eventTypeId: 0,
        eventTypeName: "",
        eventTypeDescription: "",
      },
    }),
    mounted() {
       this.fetchItems()
    },
    created () {
      this.fetchItems()
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Tipo de Evento' : 'Editar Tipo de Evento'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      //Get dos Tipos de Eventos --------------------------------------------------------------------
      fetchItems(){
        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/eventType/getEventType')
                .then(response => {this.TipoEvento = response.data
                  console.log("Vou enviar os dados:" + this.TipoEvento)
        })
      },
      //Editar o Tipo de Evento selecionado
      editItem (item) {
        this.editedIndex = this.TipoEvento.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      //Button Close ---------------------------------------------------------------------------------
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      //Button Save ---------------------------------------------------------------------------------
      save () { 
        if (this.editedIndex > -1) {
          console.log("Editar Tipo de Evento")
          this.TipoEvento.push(this.editedItem)

          axios.put("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/eventType/updateEventType",
              {
                eventTypeId: this.editedItem.eventTypeId, 
                eventTypeName: this.editedItem.eventTypeName,
                eventTypeDescription: this.editedItem.eventTypeDescription
              })
              .then(response => {
                this.fetchItems();
          });
        } else {
          console.log("Criar Tipo de Evento")
          this.TipoEvento.push(this.editedItem)
          
          axios.post("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/eventType/newEventType", {
            eventTypeName: this.editedItem.eventTypeName,
            eventTypeDescription: this.editedItem.eventTypeDescription
          }).then(response => {
            this.fetchItems();
          });
        }
        this.close()
      },
      //Remover o Tipo de Evento selecionado ---------------------------------------------------------------
      deleteItem (item) {
        const { TipoEvento } = this.TipoEvento.indexOf(item)
        if (confirm("Do you really want to delete?")) {
          axios.delete("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/eventType/deleteEventType",
              {data : {eventTypeId: item.eventTypeId}})
              .then(response => {
                this.fetchItems();
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.style {
    width: 95%;
    margin: auto;
}
</style>