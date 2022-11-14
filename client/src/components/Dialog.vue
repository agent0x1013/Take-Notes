<template>
    <v-row justify="center">
    <v-dialog
      v-model="$_options"
      persistent
      max-width="750"
    >
      <template class= 'd-none' >
        
      </template>
      <v-card class="pa-4">
        <div>
          <v-form  ref="form"
            v-model="valid"
            lazy-validation>
            <v-text-field
            v-model="title"
            label="Title"
            :rules="rules"
            required
          ></v-text-field>

    
      
        <v-textarea
          name="input-7-1"
          v-model="description"
          label="description"
          value=""
          hint="Hint text"
          :rules="rules"
          required
        ></v-textarea>

        <v-file-input
        label="Upload an image"
        v-model="image"
            counter
            show-size
            truncate-length="15"
            :rules="rules"
            required
            ></v-file-input>

        
          <v-btn
            color="primary darken-1"
            text
            :disabled="!valid"
            @click="theFunction"
          >
           <v-icon
                left
                dark
            >
                {{actionIcon}}
            </v-icon>
            {{ actioTitle }}
          </v-btn>
          <v-btn
            color="error darken-1"
            text
            @click="close"
          >
            close
          </v-btn>
        </v-form>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
    import store from '../store/index';

    export default {
        name: 'DialogVue',
        data:()=> ({
          title: null,
          description: null,
          image: null,
          valid: true,
          rules: [
             v => !!v || 'this field is required',
          ],
        }),
        props: ['func','options' ,'actioTitle', 'actionIcon'],
        computed: {
          count () {
        return store.state.token;
      },
        $_options: {
            get: function () {
                return this.options;
            },
            set: function () {
                this.$emit('update-options');
            }
        }
    },
        methods: {
            close () {
                this.$emit('update-options');
            },
            theFunction(){
              const test = this.$refs.form.validate();
              if(test)
              {
                this.func({title: this.title, description: this.description, image: this.image});
                this.$refs.form.reset();
                this.$emit('update-options');
              }
            }
        }
    }
</script>