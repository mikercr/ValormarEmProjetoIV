<template>
<div class="style">
    <v-data-table :headers="headers" :items="Produto" :search="search" class="elevation-1">
        <template v-slot:top>
            <br>
            <v-toolbar flat color="white">
                <v-toolbar-title>Produtos: </v-toolbar-title>
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
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Novo Produto</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field v-model="editedItem.productFishName" label="Nome"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field v-model="editedItem.productDescription" label="Descrição"></v-text-field>
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
        { text: 'Id', value: 'productId' },
        { text: 'Nome', value: 'productFishName'},
        { text: 'Descrição', value: 'productDescription'},
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      Produto: [],
      Produtos: [],
      editedIndex: -1,
      editedItem: {
        productId: 0,
        productFishName: "",
        productDescription: "",
      },
      defaultItem: {
        productId: 0,
        productFishName: "",
        productDescription: "",
      },
    }),
    mounted() {
       this.fetchItems()
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Produto' : 'Editar Produto'
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
        axios.get('http://projeto4valormar-iarkc.run-eu-central1.goorm.io/Product/getProduct')
                .then(response => {this.Produto = response.data
                  console.log("Vou enviar os dados:" + this.Produto)
        })
      },

      editItem (item) {
        this.editedIndex = this.Produto.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const { Produto } = this.Produto.indexOf(item)
        if (confirm("Tem a certeza que pretende remover?")) {
          axios.delete("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/Product/deleteProductById",
              {data : {productId: item.productId}})
              .then(response => {
                this.fetchItems(),
                swal("Produto removido com Sucesso!", "", "info")
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
          this.Produto.push(this.editedItem)

          axios.put("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/Product/updateProduct",
              {
                productId: this.editedItem.productId, 
                productFishName: this.editedItem.productFishName,
                productDescription: this.editedItem.productDescription
              })
              .then(response => {
                this.fetchItems(),
                swal("Produto editado com Sucesso!", "", "info")
          });

        } else {
          console.log("Criar Operador")
          this.Produto.push(this.editedItem)
          
          axios.post("https://projeto4valormar-iarkc.run-eu-central1.goorm.io/Product/newProduct",
              {
                productId: this.editedItem.productId, 
                productFishName: this.editedItem.productFishName,
                productDescription: this.editedItem.productDescription
              })
              .then(response => {
                this.fetchItems(),
                swal("Produto criado com Sucesso!", "", "info")
          });
        }
        this.close()
      },
    },
  }
</script>

<style lang="scss" scoped>
.style {
    width: 95%;
    margin: auto;
}
</style>