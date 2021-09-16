import { writable, get } from 'svelte/store';
import orderBy from "lodash.orderby";

function id(){
    return Math.round(Math.random()*1e10);
  }

const store = {
    participants: writable([]),
    profile: writable({}), /// залогиненный профиль
    /****
     * Регистрация и редактирование профиля
     */
    Register(data){
        return new Promise((resolve, reject) => {
            // имитация бэка
            setTimeout(() => {
            if (data.id) {/// изменение профиля
                ///commit('profile', data);
                store.profile.set(data);
                resolve(data);
                return;
            }
            
            if (store.CheckEmail(data.email)) {
                reject('Такой Email уже зарегистрирован, попробуйте авторизоваться');
                return;
            }
    
            if (data.passwd) {
                data.id = id();
                /// commit('profile', data); можно сразу залогинить 
            }
    
            ///commit('register', data);
            store.participants.update(old=>{
                old.push(data);
                return old;
            });
    
            resolve(data);
            }, 2000);
        });
    },
    /***
     * Вход в систему
     */
    Auth(data){
        return new Promise((resolve, reject) => {
          // имитация бэка
          setTimeout(() => {
            let participants = get(store.participants);
            let success = participants.find((item)=>item.email === data.email && item.passwd === data.passwd);
            if (success) {
              ///commit('profile', success);
              store.profile.set(success);
              resolve(success);
            } else reject('Неверный логин или пароль');
          }, 2000);
        });
    },
    CheckEmail(email) {
        let participants = get(store.participants);
        return participants.find((item)=>item.email === email);
    },
    OrderBy(field, order){
        store.participants.update(old=>orderBy(old, [field], [order || 'desc']))
    },
    distances: [
        {val: 3, title: "3 км"},
        {val: 5, title: "5 км"},
        {val: 10, title: "10 км (справка от врача обязательна)"},
    ],
};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        store.participants.update(old => data.users);
    });

export default store;