<template>
    <div>
        <br><br>
        <EditarOperador />
        <br>
        <Footer />
    </div>
</template>

<script>
import EditarOperador from "@/components/auth/editarOperador.vue";
import Footer from "@/components/auth/footer.vue";
export default {
    components: {
        EditarOperador,
        Footer
    }
}
</script>