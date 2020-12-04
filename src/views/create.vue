<template>
    <v-form @submit.prevent="submit">
        <v-card >
        <v-img height="200px" src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg">
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-btn color="white" icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title class="title white--text pl-0">
              User
            </v-toolbar-title>

            <v-spacer></v-spacer>

            
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
            </v-avatar>
            <p class="ml-3">
              {{ user.name }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12 sm4 md4>
                        <v-text-field
                            name="name"
                            label="Name"
                            id="name"
                            v-model="user.name"
                            prepend-icon="mdi-account"
                            hide-details="auto"
                            :color="errors.name ? 'error' : ''"
                            :error-messages="errors.name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <v-text-field
                            name="email"
                            label="Email"
                            id="email"
                            v-model="user.email"
                            prepend-icon="mdi-email"
                            hide-details="auto"
                            :color="errors.email ? 'error' : ''"
                            :error-messages="errors.email"
                            
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <v-select
                            :items="genders"
                            label="Gender"
                            item-value="id"
                            item-text="name"
                            v-model="user.gender_id"
                            hide-details="auto"
                            :color="errors.gender_id ? 'error' : ''"
                            :error-messages="errors.gender_id"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <v-text-field
                            name="age"
                            label="Age"
                            id="age"
                            type="number"
                            v-model="user.age"
                            prepend-icon="mdi-cake-variant"
                            hide-details="auto"
                            :color="errors.birthday ? 'error' : ''"
                            :error-messages="errors.birthday"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="user.birthday"
                            transition="scale-transition"
                            offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="user.birthday"
                                    label="Birthday"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    hide-details="auto"
                                    :color="errors.email ? 'error' : ''"
                                    :error-messages="errors.email"
                                    ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="user.birthday"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(user.birthday)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <v-switch
                        v-model="user.married"
                        :label="`Married: ${married}`"
                        
                        ></v-switch>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-textarea
                            name="info"
                            label="Info"
                            v-model="user.info"
                            hide-details="auto"
                            :color="errors.email ? 'error' : ''"
                            :error-messages="errors.email"
                            ></v-textarea>
                    </v-flex>
                </v-layout>    
            </v-container>
        </v-card-text>
        <v-card-actions >
            <v-btn text type="reset">
                Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" type="submit">Create</v-btn>
        </v-card-actions>
        </v-card>
    <v-snackbar v-model="snackbar.show" :color="snackbar.isError ? 'error' : 'success'">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn  color="white" icon @click="snackbar.show = false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    </v-form>
</template>

<script>

export default {
    data: () => ({
        user: {},
        genders: [],
        editing: false,
        showWarning: false,
        snackbar: {
            show: false,
            text: '',
            isError: false
        },
        errors: {},
        menu: false
    }),
    computed: {
        married() {
            return this.user.married ? 'Yes' : 'No'
        }
    },
    mounted(){
        this.getGenders()
        
    },
    methods: {
        getGenders() {
            this.$store.dispatch('users/genders')
            .then(response => {
                this.genders = response
            })
            .catch(error => {
                this.snackbar = {
                    show: true,
                    text: error.statusText,
                    isError: true
                }
            })
        },
        submit() {
            this.user.married = this.user.married ? true : false
            this.$store.dispatch('users/create', this.user)
            .then(response => {
                this.snackbar = {
                    show: true,
                    text: `User ${response.name} has been created successfully`,
                    isError: false
                }
            })
            .catch(error => {
                console.log(error)
                const e = error.data.errors
                Object.keys(e).forEach(key => {
                    this.errors[key] = e[key][0]
                })
                this.snackbar = {
                    show: true,
                    text: error.statusText,
                    isError: true
                }
            })
        }
    }
}
</script>

<style>

</style>