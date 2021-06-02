<template>
  <v-footer  elevation="4" color="#383A3C">
      <v-col class="text-center white--text" cols="12" >
        {{ new Date().getFullYear() }} — <strong>Valomar</strong>
      </v-col>  
      <v-col class="text-center" cols="12" >
      
      </v-col>
  </v-footer>
</template>
<script>
  export default {
    name: 'footer',
    data: () => ({
    }),
    methods: {
    },
  }
</script>

<style scoped>
.fixarRodape {
        bottom: 0;
        position: fixed;
        width: 90%;
        text-align: center;
    }
</style>