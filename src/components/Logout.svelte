
<h2>Выход из профиля</h2>

<script>
///import M from "materialize-css/dist/js/materialize.js";
    import {replace} from 'svelte-spa-router';
    import store from '../store.js';


    //M.toast({html: 'Вы вышли из профиля'});
    store.profile.set();
    replace('/');

</script>