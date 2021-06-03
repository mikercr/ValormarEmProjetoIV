<template>
<v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
 export default {
    data () {
      return {
        items: [
          {
            src: 'https://exame.com/wp-content/uploads/2020/06/peixe-cardume-oceano-mar.jpg?quality=70&strip=info',
          },
          {
            src: 'https://cdn1.newsplex.pt/fotos/2019/4/14/688381.jpg?type=Artigo'
          },
          {
            src: 'https://noticias.up.pt/wp-content/uploads/2021/02/plastico_oceano_destaque_02.jpg',
          },
         
        ],
      }
    },
  }
</script>

<style scoped>
</style>