<template>
  <div class="about">
    <v-img style = "{width: 100%; height: 300px; background-size:cover}" :src='"http://localhost:3000/" + note.image'/>
    <div class="pa-4">
      <div class="text-h2">{{note.title}}</div>
      <div class="mt-2">{{note.description}}</div>
      <div>
        
      </div>
    </div>
    
    <v-btn v-for="(buttonInfo, index) in buttonsInfo" :key="index" class="mx-3"
      :color="buttonInfo.color"
      large
      @click="buttonInfo.fun"
    >
    <v-icon left>{{buttonInfo.icon}}</v-icon>
      {{ buttonInfo.title }}
    </v-btn>
    <Dialog @update-options="optionsProps" :options="options" :func="edit" actionIcon="mdi-pencil" actioTitle="Edit the Note" />
    </div>
</template>

<script>
import store from "@/store"
import axios from "axios"
import Dialog from "./../components/Dialog.vue"
  export default {
    name: 'AboutView',

    components:{
        Dialog,
      },
    data(){
      return {
        noteId : this.$route.params.id,
        note: null,
        options: false,
        buttonsInfo:[
          {
            title:'Edit the Note',
            icon: 'mdi-pencil',
            color: 'primary',
            fun: ()=> this.options = !this.options,

          },
          {
            title: 'Delete the Note',
            icon: 'mdi-delete',
            color: 'error',
            fun: async ()=>{
              await axios.delete('http://localhost:3000/api/note/' + this.noteId, {
                headers: {
                  Authorization: 'Bearer ' + store.state.token
                }
              })
              store.commit('deleteNote', this.noteId);
              this.$router.push({ name: 'home' });
            }
          }
        ]
      }
    },
    methods:{
            optionsProps () {
              this.options === true ? this.options = false : this.options = true
            },
            async edit(note){
              const {title, description, image} = note;
              var formData = new FormData();
              formData.append("image", image);
              formData.append("title", title);
              formData.append("description", description);
              await axios.put('http://localhost:3000/api/note/' + this.noteId, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': 'Bearer '  + this.count
                }
              })
              const res = await axios.get('http://localhost:3000/api/note',  {
                headers: {Authorization: 'Bearer '  + this.count}
              });
              store.commit('setNotes',res.data.notes);
            }
          },
          computed: {
            notes(){
              return store.state.notes;
            },
            count () {
              return store.state.token;
            },
          },
          watch: {
            notes: {
              handler(){
                const note = store.state.notes.filter((elm) => {
                  return elm._id === this.noteId; 
                })
            this.note = note[0];
              },
              immediate: true
            }
          },
  }
</script>
