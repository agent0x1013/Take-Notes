<template>
  <v-app>
    <NavBar v-if="$route.name != 'SignIn' && $route.name != 'SignUp'"></NavBar>
    
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import NavBar from "./components/NavBar.vue";
  import store from "./store/index"
  import axios from "axios";
  export default {
    name: 'App',
    components : {
      NavBar
    },
    data: () => ({
      False : true
    }),
    async beforeCreate(){
      const firstLogin = localStorage.getItem('firstLogin')
      if(firstLogin){
          const refreshToken = async () =>{
              const res1 = await axios.get('http://localhost:3000/user/refresh_token', {withCredentials: true})
              store.commit('setToken',res1.data.accesstoken);
              const res2 = await axios.get('http://localhost:3000/api/note',  {
                headers: {Authorization: 'Bearer '  + this.count}
              });
              store.commit('setNotes',res2.data.notes);
              this.notes = this.storeNotes;
              setTimeout(() => {
                  refreshToken()
              }, 10 * 60 * 1000)
          }
          refreshToken()
      }
      
  },
  computed: {
    count(){
      return store.state.token;
    }
  },
};

</script>
