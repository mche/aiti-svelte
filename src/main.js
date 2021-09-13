import App from './App.svelte'
import Head from './Head.svelte';
import './main.scss';

let props = {
  "head": {
    "title": 'Михаил ★ mche.us.to',
  },
};

new App({
  target: document.body,
  props,
});

new Head({
  target: document.head,///.body,
  props,
});

///export default app