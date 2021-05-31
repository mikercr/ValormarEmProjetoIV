<template>
    <div class="container">
        <h3 class="p-3 text-center">Operadores</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>NIF</th>
					<th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="Operator in Operator" :key="Operator.OperatorId">
                    <td>{{Operator.OperatorId}}</td>
                    <td>{{Operator.operatorName}}</td>
                    <td>{{Operator.operatorNIF}}</td>
					<td><div id="example-3">
  <button v-on:click="deleteOperator(Operator.OperatorId)">Eliminar</button>
</div></td>
                </tr>
            </tbody>
        </table>
		
<div id="operador">
  <a href="/operadorform"><button v-on:click="operadorform()">Adicionar Operador</button></a>
</div>
    </div>  

</template>
<script>
	import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
export default {
  /*components: {
	  SideBarComponent
  },*/
  	data() {
    	return {
			Operator : {},
    	};
  	},
	async mounted() {
		this.Operator = (await axios.getOperator(this.$router)).data
		this.getOperator();
	},
  	methods: {
		getOperator() {
			
	  	},
	  	deleteOperator(){
			//await axios.deleteOperator(`this.$router/${id}`)
			//this.getOperator();
		}
	},
	created() {
		this.getOperator();
	}
};
</script>

<style scoped></style>
