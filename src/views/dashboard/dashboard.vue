<template>
  <v-app id="devnotes-dashboard">
    <Navbar :pageTitle="pageTitle" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Navbar from "../../components/navbar/navbar.vue";

@Component({
  components: {
    Navbar
  },
  created() {
    this.pageTitle = this.$router.currentRoute.meta.title;
  }
})

// export default Vue.extend({
export default class Dashboard extends Vue {
  pageTitle!: string;

  @Watch("$route")
  onRouteChanged(to: string, from: string) {
    this.pageTitle = to.meta.title;
  }

  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    }
  }
  // });
}
</script>
<style scoped>
:root {
  min-height: 0vh;
}
</style>