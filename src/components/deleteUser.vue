<template>
  <v-dialog
      v-model="dialog"
      scrollable 
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition">
      <v-card>
          <v-toolbar color="error">
              Delete this user?
          </v-toolbar>
          <v-card-text>
              Are you sure?
          </v-card-text>
          <v-card-actions>
              <v-btn color="info" text @click="cancel">
                  Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="deleteUser">
                  Delete
              </v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: {
        show: Boolean,
        id: Number
    },
    computed: {
        dialog() {
            return this.show
        }
    },
    methods: {
        deleteUser() {
            console.log(this.id)
            this.$store.dispatch('users/deleteUser', this.id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        },
        cancel() {
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>