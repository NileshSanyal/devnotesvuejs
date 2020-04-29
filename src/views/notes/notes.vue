<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold">Add Note</h1>
      </v-card-title>
      <v-divider class="mx-4" inset horizontal></v-divider>

      <v-tabs v-model="tab" background-color="transparent" color="primary" class="pt-5" grow>
        <v-tab v-for="item in items" :key="item" v-text="item"></v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat color="basil">
            <v-form ref="createNoteForm" v-model="createNoteForm">
              <v-row>
                <v-col cols="12">
                  <v-card-text>
                    <v-text-field
                      v-model="noteData"
                      label="Note"
                      :rules="notesRule"
                      :counter="noteCharacterCountValue"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :disabled="!createNoteForm" v-on:click="saveNote">Save</v-btn>
                  </v-card-actions>
                  <v-snackbar v-model="notesSnackBar">
                    {{ noteMessage }}
                    <v-btn color="pink" text @click="notesSnackBar = false">Close</v-btn>
                  </v-snackbar>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-data-table :headers="headers" :items="notes" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <!-- <v-toolbar-title>My Notes</v-toolbar-title> -->
                <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <!-- <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">New Note</v-btn>
                  </template>-->
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-form ref="editNoteForm" v-model="editNoteForm">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="editedItem.noteData"
                                label="Note"
                                :rules="notesRule"
                                :counter="noteCharacterCountValue"
                              ></v-text-field>
                              <v-text-field v-model="editedItem.noteid" class="note-id-hidden"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="updateNote"
                        :disabled="!editNoteForm"
                      >Update</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>

              <Confirm ref="confirm"></Confirm>
            </template>
            <!-- <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>-->
          </v-data-table>
          <v-snackbar v-model="notesSnackBar">
            {{ noteMessage }}
            <v-btn color="pink" text @click="notesSnackBar = false">Close</v-btn>
          </v-snackbar>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>

  <!-- <v-container>
  <v-card max-width="1200">
    <v-data-table :headers="headers" :items="notes" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Notes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Note</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="editNoteForm" v-model="editNoteForm">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.noteData"
                          label="Note"
                          :rules="notesRule"
                          :counter="noteCharacterCountValue"
                        ></v-text-field>
                        <v-text-field v-model="editedItem.noteid" class="note-id-hidden"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveNote" :disabled="!editNoteForm">Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-snackbar v-model="notesSnackBar">
      {{ noteMessage }}
      <v-btn color="pink" text @click="notesSnackBar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
  </v-container>-->
</template>     
<style scoped>
.note-id-hidden {
  display: none;
}
</style>
<script lang="ts" src="./notes.ts">
</script>

