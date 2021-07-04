<template>
    <div>
        <CriarOperador />
        <br>
        <Footer />
    </div>
</template>

<script>
import CriarOperador from "@/components/auth/criarOperador.vue";
import Footer from "@/components/auth/footer.vue";
export default {
    components: {
        CriarOperador,
        Footer
    }
}
</script>
