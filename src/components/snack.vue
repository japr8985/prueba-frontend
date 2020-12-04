<template>
  <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" icon @click="snackbar = false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        snack: Boolean,
        message: String
    },
    computed: {
        text() {
            return this.message
        },
        snackbar() {
            return this.snack
        }
    }
}
</script>

<style>

</style>