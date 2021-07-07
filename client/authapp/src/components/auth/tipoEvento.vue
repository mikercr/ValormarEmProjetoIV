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
        <v-btn color="primary" dark class="mb-2">Novo Tipo de Evento</v-btn>
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
    methods: {
      //Get dos Tipos de Eventos
      fetchItems(){
        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/eventType/getEventType')
                .then(response => {this.TipoEvento = response.data
                  console.log("Vou enviar os dados:" + this.TipoEvento)
        })
      },
      //Criar Tipo de Evento
      //Editar o Tipo de Evento selecionado
      //Remover o Tipo de Evento selecionado
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