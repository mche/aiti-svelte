// Components
import Home from './components/Home.svelte'
import Logout from './components/Logout.svelte'
import Profile from './components/Profile.svelte'
import NotFound from './components/NotFound.svelte'
import {wrap} from 'svelte-spa-router/wrap'


export default {
    // Exact path
    '/': Home,
    '/logout': Logout,
    '/profile': wrap({
        component: Profile,
        ///userData: {fromRouter: true}
        // Static props
        props: {
            fromRouter: true,
        }
    }),

    // Using named parameters, with last being optional
    ////'/hello/:first/:last?': Name,

    // Wildcard parameter
    // Included twice to match both `/wild` (and nothing after) and `/wild/*` (with anything after)
    ////'/wild': Wild,
    ////'/wild/*': Wild,

    // Catch-all, must be last
    '*': NotFound,
}