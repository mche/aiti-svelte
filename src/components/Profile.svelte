<h2>{form.id ? 'Мой профиль' : 'Форма регистрации участника'}</h2>
<form bind:this={Refs.form} class="card col s12">
  <div class="card-content">
    <div class="row">
      <div class="input-field col s12 m6">
        <input id="name"bind:value={ form.name } type="text"
          class="{form.name.length ? IsValidName ? 'valid' : 'invalid' : ''}"/>
        <label for="name" class="active">ФИО</label>
        <span class="helper-text" data-error="Введите ФИО" data-success=""></span>
      </div>

      <div class="input-field col s12 m6">
        <input bind:this="{Refs.birthPicker}" id="birth" type="text" class="validate"/>
        <label for="birth" class="active">Дата рождения</label>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12 m6">
        <input id="phone" bind:value="{ form.phone }" type="text"
          class="{form.phone.length ? IsValidPhone ? 'valid' : 'invalid' : ''}" v-maska="'+7 ### ### ## ##'" maska="phoneMaska($event)" />
        <label for="phone" class:active="{ form.id }">Телефон</label>
        <span class="helper-text" data-error="Введите правильный телефон +7 xxx xxx xx xx" data-success=""></span>
      </div>
    
      <div class="input-field col s12 m6">
        <input id="email" type="email" bind:value="{ form.email }" class="validate" />
        <label for="email" class:active="{ form.id }">Email</label>
        <span class="helper-text" data-error="Введите корректный email" data-success=""></span>
      </div>

    </div>


    <div class="row">
      <div class="input-field col s12 m6">
        <select bind:this="{ Refs.distance }" id="distance" bind:value="{ form.distance }" class="validate" class:valid="{ !!form.distance }">
          <option value="" disabled selected>Выберите подходящую вашему здоровью дистанцию</option>
          {#each store.distances as item (item.val)}
              <option value="{ item.val }">{ item.title }</option>
          {/each}
        </select>
        <label for="distance" class:active="{ !!form.distance }">Дистанция забега</label>
      </div>

      <div class="input-field col s12 m6">
        <input id="payment" bind:this="{ Refs.inputPayment }" bind:value="{ form.payment }" type="text" class="validate"
          on:keyup="{ChangeMoney}" on:keypress="{ChangeMoney()}" on:blur="{ChangeMoney()}" >
        <label for="payment" class="active">Сумма взноса, руб</label>
        <span class="helper-text" data-error="" data-success="">Сумма может составлять от 100 до 10 000 руб.</span>
        <span class="right payment-set"> 
              <a on:click="{SetPayment(500)}" href="javascript:" class="chip hoverable">500 руб</a>
              <a on:click="{SetPayment(1000)}" href="javascript:" class="chip hoverable">1000 руб</a>
        </span>
      </div>
    </div>

    <div class="row">
      <div class="col s12 { !!form.confirm || !!form.id ? 'card card-content m6 offset-m3' : '' }">
        <div class:hide="{!!form.id}" class="center">
          <span class="">Создать профиль </span>
          <label class="chip grey lighten-4">
                <input type="checkbox" bind:checked="{ form.confirm }" disabled="{ !form.email }"/>
                <span>Да</span>
          </label>
          <span class="helper-text" data-error="" data-success=""></span>
        </div>
        <div class:hide="{!form.confirm || !form.id}">
          <h6 class:hide="{!!form.id}">Ваш логин: <span class="chip">{ form.email }</span> </h6>
          <div class="input-field passwd">
            <input id="password" type="{ form.visibilityPasswd ? 'text' : 'password' }" value="{ form.passwd }"
                on:input="{(event) => {form.passwd = event.target.value}}"
                class="{ form.passwd.length ? IsValidPasswd ? 'valid' : 'invalid' : '' }" autocomplete="off">
            <label for="password" class:active="{ !!form.passwd.length }">Укажите пароль для вашего профиля</label>
            <span class="helper-text" data-error="любые символы от 3 до 10 знаков включительно" data-success=""></span>
            <a on:click="{VisibilityPasswd}" href="javascript:" class="hoverable">
              <i class="material-icons">{ form.visibilityPasswd ? 'visibility_off' : 'visibility' }</i>
            </a>
          </div>
        </div>
      </div>
      <div class:hide="{!saveError}" class="chip red-text center">{ saveError }</div>
    </div>
    <div class="card-action">
      <!-- Preloader v-if="isProgress" /-->
      <a on:click="{Save}" href="javascript:" class="btn" class:disabled="{ !IsValidForm || saveError || isProgress }">
        {#if !form.id}
            <i class="material-icons right">send</i>
            <span>Отправить заявку<span class:hide="{ !form.confirm }"> и зарегистрироваться</span></span>
        {:else}
            <i class="material-icons material-icons-outlined left">border_color</i>
            <span>Сохранить</span>         
        {/if}
      </a>
      <a class="btn right red lighten-2" on:click="{Cancel}" href="javascript:">Отмена</a>
    </div>
  </div>
</form>

<script>
    import M from "materialize-css/dist/js/materialize.js";
    import {push, pop, location} from 'svelte-spa-router';
    import { createEventDispatcher } from 'svelte';
    import store from '../store.js';
    import util from "../util.js";

    // Маршрут 
    export let fromRouter = false;

    let Refs = {};
    let form = { birth: "2000-03-15", distance:0, phone:'', rawPhone:'', name:'', email:'', passwd:'', payment:300, confirm: false, visibilityPasswd: false};
    let changeMoneyTimer, saveError, isProgress;

    const dispatch = createEventDispatcher();

    $: IsValidName = util.re.name.test(form.name);
    $: IsValidPhone = /*form.rawPhone &&*/ form.phone.length === 10;
    ///$: IsValidEmail = util.re.email.test(form.email);
    $: IsValidPasswd = form.passwd.length && (form.passwd.length > 2 && form.passwd.length < 11);
    ///$: IsValidDistance = !!form.distance;
    ///$: IsValidPayment = form.payment !== '';
    $: IsValidForm = false;
    /*this.saveError = undefined;
    return this.IsValidName
      && this.IsValidPhone
      && this.IsValidEmail
      && (!this.form.confirm || this.IsValidPasswd)
      && this.IsValidDistance
      && this.IsValidPayment;*/

    function SetPayment(val){
        form.payment = val;
        console.log("SetPayment", Refs.inputPayment);
        ///Refs.inputPayment.focus();
    }

    function ChangeMoney(event) {
        if (changeMoneyTimer) clearTimeout(changeMoneyTimer);
        changeMoneyTimer = setTimeout(() => {
            let input = form.payment.toString();
            if ( input === '') return true;
            let payment = input.replace(util.re.nonDigit, '');

            if (event && input !== payment) {
                event.preventDefault();
                form.payment = payment;
                return false;
            }
            form.payment = payment;
            let sum = Math.max(Math.min(form.payment, 10000), 100);
            if (!isNaN(sum)) form.payment = sum;
        }, 500);
    }

    function VisibilityPasswd(event) {
        form.visibilityPasswd = !form.visibilityPasswd;
    }

    function Save(){
        isProgress = true;
        form.createDate = form.createDate || new Date();
        form.phone = '+7'+form.rawPhone;
        if (!form.confirm && !form.id) this.form.passwd = ''; 
        let toast = !form.id;
        store.Register(this.form).then((success) => {
            if (toast) M.toast({html: 'Поздравляем! Ваша заявка сохранена.'});
            else M.toast({html: 'Профиль сохранен.'});

            if (location !== '/participants')
                push('/participants');
            dispatch('register', true);
        }, (err) => {
            saveError = err;
            isProgress = false;
        });
    }

    function Cancel(){
        if (!fromRouter) 
            dispatch('cancel', true);
        else pop();
    }

</script>

<style lang="scss">
/*.input-field.passwd a {
  position: absolute;
  top: 0.5rem;
  right: 0;
  color: $primary-color;
}*/

.payment-set {
    font-size: smaller;
    position: absolute;
    right: 0;
    top: 1rem;
    .chip {
        padding: 0 0.5rem;
        line-height: normal;
        vertical-align: middle;
        height: auto;

    }
}
</style>