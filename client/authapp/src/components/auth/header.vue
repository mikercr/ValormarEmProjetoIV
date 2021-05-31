<template>
  <v-main>
    <v-container>
      <v-row>
      <v-col cols="4">
        <v-img class="ml-16" src="../assets/logo.png" max-height="64px" max-width="64px" v-if="navViewMobile && !showNavMobile"  ></v-img>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-btn class="bg_head ml-2 mt-2" v-if="navViewMobile && !showNavMobile" v-on:click="showNavMobile = true" elevation="4">
          <v-icon class="bar_icon ">fas fa-bars</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-container>
    <v-app-bar class="bg_head transaction pr-16" elevation="4" v-if="!navViewMobile" >
      <v-img class="ml-16" src="../assets/logo.png" max-height="64px" max-width="64px" ></v-img>
      <v-spacer></v-spacer>
      <v-btn to="/" :class="arrNumberMenu[0] + ' transaction  font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(0)">
        Home
      </v-btn>
      <v-btn to="/eventos" :class="arrNumberMenu[1] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(1)">
        Eventos
      </v-btn>
      <v-btn to="/equipa" :class="arrNumberMenu[2] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(2)">
        Equipa
      </v-btn>
      <v-btn href="#Departamentos" :class="arrNumberMenu[3]  + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(3)">
        Departamentos
      </v-btn>
      <v-btn to="/historia" :class="arrNumberMenu[4] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(4)">
        Historia
      </v-btn>
      <v-btn href="#SobreNos" :class="arrNumberMenu[5] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(5)">
        Sobre nos
      </v-btn>
      <v-btn to="/contactos" :class="arrNumberMenu[6] + ' transaction font-weight-medium'" elevation="0" x-large tile v-on:click="changeMenuActive(6)">
        Contactos
      </v-btn>
    </v-app-bar>
    <v-card :class="'bg_head ' +  classBg + ' transaction mt-0 pt-0'" style="width:100%" elevation="6" v-if="showNavMobile" >
      <v-row >
        <v-col cols="12" class="col-12 pa-0" elevation="6" >
          <v-btn to="/" :class="arrNumberMenu[0] + ' bg_color transaction  font-weight-medium'" style="width: 100%" elevation="0" x-large tile v-on:click="changeMenuActive(0)">
          Home
        </v-btn>
        <v-btn to="/eventos" :class="arrNumberMenu[1] + ' bg_color transaction  font-weight-medium'" style="width: 100%" elevation="0" x-large tile v-on:click="changeMenuActive(1)">
          Eventos
        </v-btn>
        <v-btn to="/equipa" :class="arrNumberMenu[2] + ' bg_color transaction  font-weight-medium'" style="width: 100%" elevation="0" x-large tile v-on:click="changeMenuActive(2)">
          Equipa
        </v-btn>
        <v-btn href="#Departamentos" :class="arrNumberMenu[3]  + ' bg_color transaction  font-weight-medium'" style="width: 100%" elevation="0" x-large tile v-on:click="changeMenuActive(3)">
          Departamentos
        </v-btn>
        <v-btn to="/historia" :class="arrNumberMenu[4] + ' bg_color transaction  font-weight-medium'" style="width: 100%" elevation="0" x-large tile v-on:click="changeMenuActive(4)">
          Historia
        </v-btn>
        <v-btn href="#SobreNos" :class="arrNumberMenu[5] + ' bg_color transaction  font-weight-medium'" style="width: 100%" elevation="0" x-large tile v-on:click="changeMenuActive(5)">
          Sobre nos
        </v-btn>
        <v-btn to="/contactos" :class="arrNumberMenu[6] + ' bg_color transaction  font-weight-medium'" style="width: 100%" elevation="0" x-large tile v-on:click="changeMenuActive(6)">
          Contactos
        </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>
<script>
  export default {
    name: 'head',
    data: () => ({
      navViewMobile: false,
      elevation: 0,
      classBg: '',
      scrollPosition: 0,
      arrNumberMenu: ['active ','','','','',''],
      showNavMobile: false
    }),
    methods: {
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
      }
    },
    mounted() {
      window.addEventListener('scroll', this.updateScroll);
      window.addEventListener('resize', this.updateView);
    },
    computed: {
    },
    created() {
      this.handleView();
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
  z-index: 40 !important;
}

.tranparent {
  background-color: transparent !important;
  color: #ffffff !important;
}

.bg_color {
  background-color: #ffffff !important;
  color: #333333 !important;
}

.active {
  border-bottom: 3px solid #FFC000 !important;
}

.transaction {
  -webkit-transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}
  
</style>