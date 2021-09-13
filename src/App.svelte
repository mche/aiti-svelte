<main>
  <div class="clock">
    <Clock />
    <div>Это SVG-часы - динамический Свелт-компонент.</div>
  </div>
  <h1>
    <span class="me"><Me options={{style:{height: '15rem'}}} /></span>
    <span class="svelt-color font-effect-3d-float">{head.title}</span>
  </h1>

  <h2>{ main_post.title }</h2>
  <div>{@html main_post.html || '' }</div>
  
  { #each posts as p }
    <h3><a  on:click={ Click(p) }  href="javascript:" class="gr-color">{ p.title }</a></h3>
    <p>{@html p.html }</p>
    {#if !!p.code }<code class="code">{ p.code }</code>{/if}
  { /each }
  <!--FooComponent1 text="{head.title}"/-->
</main>

<script>
    ///import logo from './assets/svelte.png'
    ///import './global.css'
    import Clock from './components/Clock.svelte';
    import Me from './components/Me.svelte';
    import data from './store.js';
    export let head;


    let posts, main_post;
    $: main_post = {title: "Сайт загружается ..."};
    $: posts = [];

    const unsubscribe = data.посты.subscribe(посты => {
        main_post = посты.shift();
        posts = посты;///!!!! реактивность массива
	});
  
  
    const Click = (post) => {
      post.title = ' ¡ ' +post.title + ' ! ';
      post._hide = !post._hide;
      posts = posts;///!!!! реактивность массива
    };
    
    
  </script>
  
  
  <style lang="scss">
    $sv-color: #ff3e00;
    $gr-color: #1B5E20;

    main {
      padding: 1em;
      /*margin: 0 auto;*/
    }
  
    
    .font-effect-3d-float {
        text-shadow: 0 0.15em 0.11em rgba(0, 0, 0, 0.15), 0 0.25em 0.021em rgba(0, 0, 0, 0.1), 0 0.32em 0.32em rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      font-size: 3em;
      font-weight: 100;
      margin:0;
    }

    h2 {
      font-size: 2em;
      font-weight: 100;
      margin-top: 0;
      color: $gr-color;
    }
  
    h3 {
      font-weight: 400;
      margin-bottom: 0rem;
      margin-top: 3rem;
    }
    
    .me {
      display:inline-block;
    }
    
    .svelt-color {
      color: $sv-color;
    }
    .gr-color {
      color: $gr-color;
    }
    /*.center {
      text-align: center;
    }*/
    
    .clock {
      width: 15rem;
      float: right;
    }
    
    .code {
      display:block;
      padding: 0.5rem 1rem;
      white-space: pre-wrap;
      text-align: left;
      background-color: black;
      color: wheat;
    }
  
  </style>