<template>
  <div>
    <NavBar />
<br>
    <section>
      <div class="container mt-10">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">Name : {{ user.name }}</li>
              <li class="list-group-item">Email : {{ user.email }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
  
</template>

<script>
import NavBar from "@/components/auth/header.vue";
import Footer from "@/components/auth/footer.vue"
import VueJwtDecode from "vue-jwt-decode";
export default {
  components: {
	  NavBar,
    Footer
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
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  },

  created() {
    this.getUserDetails();
  }
};
</script>

<style scoped></style>

