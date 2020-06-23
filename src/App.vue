<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model=drawerRight
      clipped
      right
      app
    >
    </v-navigation-drawer>
    
    <v-app-bar
      app
      clipped-right
      color="blue-grey"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>WEB TITLE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"><v-icon >message</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model=drawer
    >
      <DropDown />
    </v-navigation-drawer>

    <v-main 
    >
      <v-container
        app
      >
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer
      app
      color="blue-grey"
      dark
    >
      <span>김현겸</span>
      <v-spacer></v-spacer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import DropDown from '../src/components/DropDown.vue'
  export default {
    props: {
      source: String,
    },
    components: {
      DropDown,
    },
    data: () => ({
      drawerRight: false,
      drawer: false
    }),
  }
</script>