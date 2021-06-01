import Vue from 'vue';
import Router from 'vue-router';

import Inicio from './components/Inicio'
// import Usuario from './components/usuario/Usuario'
// import UsuarioLista from './components/usuario/UsuarioLista'
// import UsuarioDetalhe from './components/usuario/UsuarioDetalhe'
//import UsuarioEditar from './components/usuario/UsuarioEditar'
import Menu from './components/template/Menu'
import MenuAlt from './components/template/MenuAlt'

Vue.use(Router)

const Usuario = () => import(/* webpackChunkName: "usuario" */'./components/usuario/Usuario')
const UsuarioEditar = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioEditar')
const UsuarioLista = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioLista')
const UsuarioDetalhe = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioDetalhe')
//Utilizando dessa forma, os componentes serão carregados separadamente, somente quando necessário
/*
webpackChunkName: "usuario" 

Define um módulo, ou seja, que esses elementos com esse nome serão renderizados juntos

Somente um arquivo com os elementos juntos é carregado

É um comentário interpretado pelo webpack

Não é recomendado deixar tudo separado, porque muitas requisições serão feitas, e também haverá perda de performance

*/

//Mais utilizado em projetos grandes
//Exemplo. Tela de usuário com 10 mil usuários e tela de administradores com 30 usuários
//Não faria sentido carregar sempre a tela de administradores



const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition){
        if(savedPosition){
            return savedPosition;
        }
        //se a rota de destino tem um hash
        else if(to.hash){
            return {selector: to.hash} //scrolla até o elemento com hash
        }
        else{
        return{ x: 0, y: 0}
        }
    },
    routes: [{
            path: '/',
            //component: Inicio,
            name: 'inicio',
            components: {
                default: Inicio,
                menu: Menu
            }
        }, {
            path: '/usuario', //definindo que a rota deve receber um parâmetro
            // component: Usuario,
            components: {
                default: Usuario,
                menu: MenuAlt,
                menuInferior: MenuAlt
            },
            props: true, //define que os parâmetros serão enviados como propriedades
            children: [ //usado para criar rotas aninhadaas
                {
                    path: '',
                    component: UsuarioLista
                }, //somente /usuario
                {
                    path: ':id',
                    component: UsuarioDetalhe,
                    props: true,
                    //antes de entrar nessa rota ESPECÍFICA
                    beforeEnter: (to, from, next) => {
                        console.log('Antes da rota -> usuário detalhe')
                        next()//o next() é necessário para prosseguir para a rota destino
                    }
                }, // /usuario/10
                {
                    path: ':id/editar',
                    component: UsuarioEditar,
                    props: true,
                    name: 'editarUsuario'
                }, // /usuario/10/editar 
                //O name representa um Alias dado para a rota
            ]
        },
        {
            path: '/redirecionar',
            redirect: '/usuario'
        },
        {
            path: '*', //Caso o usuário digite alguma rota que não existe
            redirect: '/' //Será redirecionado para a rota inicial
        }
    ]
})

//Sempre passa por esse método antes de qualquer navegação em qualquer path
router.beforeEach((to, from, next) => {  
    console.log('antes das rotas -> global')
    next()
    // if(to.path !== '/usuario'){
    //     next('/usuario')
    // }
    // else{
    //     next()
    // }

})

export default router