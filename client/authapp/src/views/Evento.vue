<template>
  <div>
    <Header />
    <br><br>
	<div class="style">
	<Evento />
	</div>
    <br>
    <Footer />
	</div>
</template>

<script>
import Header from "@/components/auth/header.vue";
import Evento from "@/components/auth/evento.vue";
import Footer from "@/components/auth/footer.vue";
export default {
	components: {
		Header,
		Evento,
		Footer
	}
};
</script>

<style scoped>

</style>
