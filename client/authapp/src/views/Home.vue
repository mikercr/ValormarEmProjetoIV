<template>
  <div>
    <Header />
    <br>
    <br>
    <v-spacer></v-spacer>  
    <v-col >
      <v-divider color="Gray"></v-divider>
      <h2 class="mt-2 text-h4 font-weight-bold" align="center" justify="center">Bem Vindo ao Backoffice ValorMar, {{user.name}}</h2>
    </v-col>
    <v-divider color="Gray"></v-divider>
    <br>
    <v-row><Carousel/></v-row>
    <br><br><br><br><br>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/auth/header.vue";
import Footer from "@/components/auth/footer.vue";
import Carousel from "@/components/auth/carousel.vue";
import VueJwtDecode from "vue-jwt-decode";
export default {
  name :'Home',
  components: {
	  Header,
    Footer,
    Carousel
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    }
  },

  created() {
    this.getUserDetails();
  }
};
</script>

<style scoped>
.bg_img::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.60);
  z-index: 0;
}
</style>
