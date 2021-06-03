<template>
  <div>
    <Header />
    <br>
	<br>
		<Operador />
    <br>
    <Footer />
	</div>
</template>

<script>
import Header from "@/components/auth/header.vue";
import Operador from "@/components/auth/operador.vue";
import Footer from "@/components/auth/footer.vue";
export default {
	data() {
		return {
			user: {}
		};
	},
	components: {
    Header,
		Operador,
    Footer
	}
};
</script>

<style scoped></style>
