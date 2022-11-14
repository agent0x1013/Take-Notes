<template>
  <div>
    <v-card v-for="(note, i) in notes" :key="i" class = "mx-2 my-5 pa-3" @click="$router.push({ name: 'about', params: { id: note._id } });">
      <v-row>
        <v-col cols="2">
          <v-img
            
            :src="'http://localhost:3000/' + note.image"
          ></v-img>
        </v-col>
        <v-col cols="10">
          <div class="text-h5">
            {{note.title}}
            </div>
            <v-divider class = "my-2"></v-divider>
            <div class="text-truncate">
              {{note.description}}
              </div>
        </v-col>
      </v-row>
    </v-card>

  </div>
</template>
<script>
  import store from './../store/index'
  
  export default {
    name: 'HomeView',

    components: {

    },
    data(){
      return {
        notes: [],

      }
    },
    computed: {
      count () {
        return store.state.token;
      },
      storeNotes(){
        return store.state.notes;
      }
    },
    watch: {
      storeNotes : {
        handler(){
          this.notes = this.storeNotes;
        },
        immediate: true
      }
    },
    beforeCreate(){
      const firstLogin = localStorage.getItem('firstLogin')
      if(!firstLogin) this.$router.push({ name: 'SignIn' })
    }
  }
</script>
