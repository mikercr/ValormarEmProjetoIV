<template> 
<div class="fixarRodape">
  <v-footer  elevation="4" color="#383A3C">
      <v-col class="text-center white--text" cols="12" >
        {{ new Date().getFullYear() }} — <strong>Valormar</strong>
      </v-col>  
      <v-col class="text-center" cols="12" >
      
      </v-col>
  </v-footer>
  </div>
</template>
<script>
  export default {
    name: 'footer',
    data: () => ({
    }),
    methods: {
    },
  }
   //position: fixed;
</script>

<style scoped>
.fixarRodape {
        bottom: 1%;
      
        width: 100%;
        text-align: center;
    }
</style>