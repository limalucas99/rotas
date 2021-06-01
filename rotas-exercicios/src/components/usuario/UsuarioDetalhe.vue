<template>
  <div class="usuario-detalhe">
    <h3>Usuário Detalhe</h3>
    <p>
      <strong> Código: </strong>
      {{ id }}
    </p>
    <!-- :to="`/usuario/${id}/editar`" -->
    <!-- Nesse caso colocar id nos params é a mesma coisa que fazer id: id -->
    <router-link
      tag="button"
      primario
      :to="{
        name: 'editarUsuario',
        params: { id },
        query: { completo: true, lingua: 'pt-br' },
        hash: '#rodape',
      }"
    >
      Editar
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["id"],
  beforeRouteEnter(to, from, next){ //método de ciclo de vida do vue-router
    //console.log(this.id) -> Nao funcionana, porque o componente não foi criado ainda na chamada do método
    console.log('dentro do componente -> usuario detalhe')
    // next(vm =>{
    //   console.log(vm.id)//Aqui funciona
    // })
    const autenticado = true
    autenticado ? next() : next(false) //Só permite o acesso a rota caso a variável autenticado seja true
  },

  // data(){
  //   return {
  //     id: this.$route.params.id
  //     //pegar parâmetro id recebido pela rota
  //   }
  // },
  // watch: {
  //   $route(to, from){
  //     this.id = to.params.id
  //   }
  // },
};
</script>

<style>
</style>