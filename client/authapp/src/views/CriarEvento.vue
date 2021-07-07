<template>
    <div>
        <br><br>
        <CriarEvento />
        <br>
        <Footer />
    </div>
</template>

<script>
import CriarEvento from "@/components/auth/criarEvento.vue";
import Footer from "@/components/auth/footer.vue";
export default {
    components: {
        CriarEvento,
        Footer
    }
}
</script>