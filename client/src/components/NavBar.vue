<template>
  <div>

    <v-app-bar fixed color="#816797"  clipped-left  class="pl-0" app>
      <v-btn color="white" text class="py-8" @click="$router.push({ name: 'home' });">Take Notes</v-btn>

      <v-spacer></v-spacer>

      <v-btn outlined color="white" @click="logout">
        log out
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer permanent clipped app v-model="False">

      <v-avatar size="150" class="d-block mx-auto mt-8 mb-4">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
      </v-avatar>
      <div></div>



      <div elevation='0' align="center" class="text-h5  mx-auto">
        John Doe
      </div>

      <v-divider class="mt-2"></v-divider>

      <v-list-item link @click="options = !options">
        <v-list-item-icon>
          <v-icon v-text="'mdi-plus'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>

          <v-list-item-title>
            Add a new Note


          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <Dialog @update-options="optionsProps" :func="add" :options="options" actionIcon="mdi-plus"
        actioTitle="Add a new Note" />
    </v-navigation-drawer>
  </div>

</template>

<script>
import Dialog from "./Dialog.vue"
import axios from "axios"
import store from "@/store"

export default {
  components: {
    Dialog,
  },
  name: 'NavBar',
  data: () => ({
    False: true,
    options: false,

  }),
  computed: {
          count () {
        return store.state.token;
      },
  },
  methods: {
    optionsProps() {
      this.options === true ? this.options = false : this.options = true
    },
    async logout(){
      await axios.get('http://localhost:3000/user/logout', {withCredentials: true})
        
      localStorage.removeItem('firstLogin')
      this.$router.push({ name: 'SignIn' });
    },
    async add(note){
      const {title, description, image} = note;
      var formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      await axios.post('http://localhost:3000/api/note', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer '  + this.count
        }
      })
      const res = await axios.get('http://localhost:3000/api/note',  {
        headers: {Authorization: 'Bearer '  + this.count}
      });
      store.commit('setNotes',res.data.notes);
      console.log('test')
    }
  },
  
}
</script>