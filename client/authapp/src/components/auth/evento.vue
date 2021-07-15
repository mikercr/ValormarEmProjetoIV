<template>
  <div class="style">
    <v-data-table :headers="headers" :items="Evento" :search="search" class="elevation-1">
        <template v-slot:top>
          <br>
            <v-toolbar flat color="white">
                <v-toolbar-title>Eventos: </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Procurar"
                    single-line
                    hide-details
                ></v-text-field>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" href="/criarEvento">Novo Evento</v-btn>
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
      { text: 'Id', value: 'eventId' },
      { text: 'Utilizador', value: 'userId'},
      { text: 'Operador de Origem', value: 'operatorOriginId'},
      { text: 'Operador de Destino', value: 'operatorDestinyId'},
      { text: 'Tipo de Evento', value: 'eventTypeId'},
      { text: 'Localização do Evento', value: 'eventLocation.coordinates'},
      { text: 'Data de Inicio', value: 'startTimeStamp'},
      { text: 'Data de Fim', value: 'endTimeStamp'},
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    Evento: [],
    editedIndex: -1,
    editedItem: {
      eventId: 0,
    },
    defaultItem: {
      eventId: 0,
    },
  }),
  mounted() {
    this.fetchItems()
  },
  created () {
    this.fetchItems()
  },
  methods: {
    //Get Eventos
    fetchItems(){
      axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Event/getEvent')
        .then(response => {this.Evento = response.data
          console.log("Vou enviar os dados:" + this.Evento)
      })
    },
    //Delete Evento
    deleteItem (item) {
      const { Evento } = this.Evento.indexOf(item)
      if (confirm("Do you really want to delete?")) {
        axios.delete("http://projeto4valormar-iarkc.run-eu-central1.goorm.io/event/deleteEvent",
          {data : {eventId: item.eventId}})
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
