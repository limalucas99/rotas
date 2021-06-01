<template>
  <div class="usuario-editar">
    <h3>Usuário Editar</h3>
    <hr />
    <p><strong> Código: </strong>{{ id }}</p>
    <!-- pegando query strings passadas pela rota -->
    <p><strong> Completo: </strong>{{ $route.query.completo ? 'Sim' : 'Não' }}</p>
    <p><strong> Língua: </strong>{{ $route.query.lingua }}</p>
    <hr>
    <button primario @click="confirmou = true">Confirmar</button>
    <div id="rodape">
        <h3>Curso Vue</h3>
    </div>
  </div>
</template>

<script>
export default {
      props: ["id"],
      data() {
        return {
          confirmou: false
        }
      },
      beforeRouteLeave(to, from, next){//método de ciclo de vida do vue-router
          if(this.confirmou){ //Fazer uma verificação antes de sair da rota
            next()
          }
          else{
            if(confirm('Tem certeza?')){
               next()
            }
            else{
              next(false)
            }
          }
      }

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
#rodape{
  margin-top: 3000px;
}

</style>