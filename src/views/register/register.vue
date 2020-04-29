<template>
  <v-app id="devnotes-login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register For Devnotes</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="userRegisterForm" v-model="userValid">
                  <v-text-field
                    label="Username"
                    name="username"
                    v-model="userName"
                    :rules="usernameRequired"
                    :prepend-icon="show2 ? 'mdi-account' : 'mdi-account'"
                    type="text"
                  />

                  <v-text-field
                    label="Email"
                    name="email"
                    v-model="email"
                    :rules="emailRequired"
                    :prepend-icon="show2 ? 'mdi-email' : 'mdi-email'"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    :prepend-icon="show2 ?  'mdi-lock' : 'mdi-lock'"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    :rules="passwordRequired"
                  />

                  <v-snackbar v-model="registerUsrSnackBar">
                    {{ registerUsrErrorMsg }}
                    <v-btn color="pink" text @click="registerUsrSnackBar = false">Close</v-btn>
                  </v-snackbar>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :disabled="!userValid" v-on:click="registerUser">Register</v-btn>
              </v-card-actions>
              <v-card-subtitle>
                Already a user? Login
                <router-link to="/">here</router-link>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts" src="./register.ts"></script>
