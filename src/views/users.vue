<template>
  <v-card>
    <v-card-title primary-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        name="search"
        label="search"
        id="search"
        v-model="search"
        prepend-icon="mdi-account-search-outline"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        class="elevation-1"
        :search="search">
        <template v-slot:item.show="props">
          <v-btn color="success" :to="{ name: 'user-show', params: { id: props.item.id } }" icon>
              <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'Name', align: 'start', sortable: true, value: 'name' },
      { text: 'Email', align: 'start', sortable: true, value: 'abbr' },
      { text: 'Show', align: 'center', value: 'show'},
    ],
    users: [],
    search: ''
  }),
  computed: {
    loading() {
      return this.$store.getters['users/get_loading']
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      this.$store.dispatch('users/list')
      .then(response => {
        this.users = response
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>