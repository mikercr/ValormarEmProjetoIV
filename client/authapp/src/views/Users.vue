<template>
  <div>
    <Header />
    <br><br>
	<Users />
    <br>
    <Footer />
	</div>
</template>

<script>
import Header from "@/components/auth/header.vue";
import Users from "@/components/auth/users.vue";
import Footer from "@/components/auth/footer.vue";
export default {
	components: {
		Header,
		Users,
		Footer
	}
};
</script>

<style scoped></style>