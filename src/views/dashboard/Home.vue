<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>Houasnia.aymen.a@hns-re2sd.dz</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <router-link
          v-for="[icon, text, route] in links"
          :key="icon"
          :to="route"
          custom
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard-View",
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox", "/admin/inbox"],
      ["mdi-account-multiple", "Students", "/admin/students"],
      ["mdi-account-tie", "Teachers", "/admin/teachers"],
      ["mdi-account-school", "Training", "/admin/trainings"],
      ["mdi-delete", "Trash", "/admin/trash"],
      ["mdi-alert-octagon", "Spam", "/admin/spam"]
    ]
  })
};
</script>
