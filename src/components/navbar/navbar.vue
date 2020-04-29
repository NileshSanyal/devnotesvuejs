<template>
  <v-app id="devnotes-navbar">
    <v-app-bar app color="indigo" dark elevate-on-scroll="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" link>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" v-on:click="logOut"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/notes">
          <v-list-item-action>
            <v-icon>mdi-card-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component({})
export default class Navbar extends Vue {
  @Prop(String)
  public pageTitle!: string;
  data() {
    return {
      drawer: null,
      items: [
        {
          icon: "mdi-logout",
          text: "Log out"
        }
      ]
    };
  }
  logOut() {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    if (token) {
      localStorage.removeItem("token");
    }
    if (userid) {
      localStorage.removeItem("userid");
    }
    this.$router.push("/");
  }
}

/* export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}; */
</script>
