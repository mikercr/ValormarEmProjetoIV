<template>
    <div>
        <Header />
        <br><br>
        <TipoEvento />
        <br>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/auth/header.vue";
import TipoEvento from "@/components/auth/tipoEvento.vue";
import Footer from "@/components/auth/footer.vue";
export default {
	components: {
		Header,
		TipoEvento,
		Footer
	}
};
</script>

<style scoped />
