<nav>
    <div class="nav-wrapper">
        <ul class="menu left hide-on-med-and-down-00">
        <li><a href="/" class=" transparent" use:link>
            <img alt="App logo" src="/favicon.png"/>
        </a></li>
        <!--li><router-link to="/profile/new">Зарегистрироваться</router-link></li-->
        <li class:active="{ $location === '/participants' }">
            <a href="/participants" use:link><i class="material-icons left">group</i>Участники мероприятия</a>
        </li>
        {#if profile}
        <li class:active="{ $location === '/profile' }">
            <a href="/profile" use:link><span class="material-icons material-icons-outlined">account_circle</span>Профиль</a>
        </li>
        {:else}
        <li class:active="{ $location === '/auth' }">
            <a href="/auth" use:link><i class="material-icons left">login</i>Авторизация</a>
        </li>    
        {/if}
        
        
        </ul>
        <ul class="right">
            <li class:hide="{!profile}"><a href="/logout" class="center" use:link><i class="material-icons">logout</i> Выход</a></li>
        </ul>
    </div>
</nav>

<main>

  <h1>
    <span class="font-effect-3d-float">{head.title}</span>
    <span class="chip">{$location}</span>
  </h1>

  <!-- View the router page -->
  <Router {routes} />
</main>

<script>
  ///import logo from './assets/svelte.png'
  ///import './global.css'
  import store from './store.js';
  import routes from './routes.js';
  import Router from 'svelte-spa-router';
  import {link, location} from 'svelte-spa-router';
  import "./main.scss";
  ///import "materialize-css/sass/materialize.scss";

  export let head;
  let profile;
  $: profile = undefined;


  const unsubscribe = store.profile.subscribe(val => {
    profile = val;
  });
  
    
    
</script>


<style lang="scss">
//@import "./main.scss";


  
</style>