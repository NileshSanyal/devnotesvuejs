<template>
  <v-app id="devnotes-login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login To Devnotes</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="userLoginForm" v-model="userValid">
                  <v-text-field
                    label="Email"
                    name="email"
                    v-model="email"
                    :rules="emailRequired"
                    :prepend-icon="show2 ? 'mdi-email': 'mdi-email'"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    :rules="passwordRequired"
                    :append-icon="show2 ? 'mdi-eye': 'mdi-eye-off'"
                    :prepend-icon="show2 ?  'mdi-lock' : 'mdi-lock'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                  />

                  <v-snackbar v-model="loginUsrSnackBar">
                    {{ loginUsrErrorMsg }}
                    <v-btn color="pink" text @click="loginUsrSnackBar = false">Close</v-btn>
                  </v-snackbar>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :disabled="!userValid" v-on:click="loginUser">Login</v-btn>
              </v-card-actions>
              <v-card-subtitle>
                New user? Register
                <router-link to="/register">here</router-link>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts" src="./login.ts">
</script>
