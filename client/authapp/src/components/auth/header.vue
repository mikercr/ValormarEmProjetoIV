<template>
  <v-main>
    <v-container>
      <v-row>
      <v-col cols="4">
        
      </v-col>
      <v-col cols="4">
        <v-btn class="bg_head ml-2 mt-2" v-if="navViewMobile && !showNavMobile" v-on:click="showNavMobile = true" elevation="4">
          <v-icon class="bar_icon ">fas fa-bars</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-container>
    <v-app-bar class="bg_head transaction pr-16" elevation="4" v-if="!navViewMobile" >
    
        
      <v-btn to="/home" :class="arrNumberMenu[0] + ' transaction  font-weight-left'" elevation="0" x-large tile v-on:click="changeMenuActive(0)">
        Home
      </v-btn>
      <v-btn to="/users" :class="arrNumberMenu[1] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(1)">
        Utilizadores
      </v-btn>
      <v-btn to="/operador" :class="arrNumberMenu[2] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(2)">
        Operador
      </v-btn>
      <v-btn to="/evento" :class="arrNumberMenu[3]  + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(3)">
        Evento
      </v-btn>
      <v-btn to="/tipoEvento" :class="arrNumberMenu[4]  + ' transaction  font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(4)">
          Tipo Evento
        </v-btn>
      <v-btn to="/produto" :class="arrNumberMenu[5] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(5)">
        Produtos
      </v-btn>
          <v-spacer></v-spacer>
      <v-btn @click="showUser()" :class="arrNumberMenu[6] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(6)">
        <v-icon medium class="mr-2">mdi-account</v-icon>
      </v-btn>
      <v-btn to="/" :class="arrNumberMenu[7] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(7)">
        Logout
      </v-btn>
    </v-app-bar>
  </v-main>
</template>
<script>
import swal from "sweetalert";
import VueJwtDecode from "vue-jwt-decode";

  export default {
    name: 'head',
    data: () => ({
      user: {},
      navViewMobile: false,
      elevation: 0,
      classBg: '',
      scrollPosition: 0,
      arrNumberMenu: ['active ','','','','',''],
      showNavMobile: false
    }),
    methods: {
      getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      },
      logUserOut() {
				localStorage.removeItem("jwt");
				this.$router.push("/");
    	},
      updateScroll() {
       this.scrollPosition = window.scrollY;
       this.changeClassBg();
      },
      updateView() {
        if(!this.navViewMobile) {
          this.handleView();
        }
        if(window.innerWidth > 990) {
          this.navViewMobile = false;
          this.showNavMobile = false;
        }
      },
      changeClassBg() {
        if(this.scrollPosition > (screen.height/2)) {
          this.classBg = 'bg_color';
          this.elevation = 4;
        }else{
          this.classBg = 'tranparent';
          this.elevation = 0;
        }
      },
      handleView() {
        this.navViewMobile = window.innerWidth <= 990;
      },
      changeMenuActive(numberMenu) {
        for (let i = 0; i < this.arrNumberMenu.length; i++) {
          this.arrNumberMenu[i] = '';
          if(numberMenu == i) {
            this.arrNumberMenu[i] = 'active ';
            this.$forceUpdate();
          }
        }
         this.showNavMobile = false;
      },
      showUser() {
        swal("Utilizador", "Nome: " + this.user.name + "\n" + "Email: " + this.user.email, "info")
      }
    },
    mounted() {
      window.addEventListener('scroll', this.updateScroll);
      window.addEventListener('resize', this.updateView);
    },
    computed: {
    },
    created() {
      this.handleView(),
      this.getUserDetails();
    }

  }
</script>

<style scoped>

.bar_icon {
  color: #333333 !important;
}

.bg_head {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 10 !important;
}

.tranparent {
  background-color: transparent !important;
  color: #ffffff !important;
}

.bg_color {
  background-color: #696969 !important;
  color: #696969 !important;
}

.active {
  border-bottom: 3px solid #37438b !important;
}

.transaction {
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}
  
</style>