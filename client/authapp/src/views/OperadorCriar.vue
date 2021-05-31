<template>
	<div>
		<!-- App Menu -->
    	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/home">Home</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
		  
		  <a class="navbar-brand" href="/operador">Operador</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
		  
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" @click="logUserOut">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
		
		<!-- Form -->
		<operadorForm/>
		
	</div>
</template>

<script>
import operadorForm from "@/components/auth/operadorform";
export default {
	components: {
			operadorForm
		}
}
</script>