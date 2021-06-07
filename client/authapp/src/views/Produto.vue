<template>
  <div>
    <Header />
    <br><br>
	<div class="style">
	<Produto />
	</div>
    <br>
    <Footer />
	</div>
</template>

<script>
import Header from "@/components/auth/header.vue";
import Produto from "@/components/auth/produto.vue";
import Footer from "@/components/auth/footer.vue";
export default {
	components: {
		Header,
		Produto,
		Footer
	}
};
</script>

<style scoped>

</style>
