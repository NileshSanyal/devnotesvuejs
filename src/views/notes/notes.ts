import Vue from "../../plugins/axios";
// import * as INote from "../../../types/note";
import { Note } from "../../../types/note";
import { VForm } from "../../../types/vform";

import Confirm from "../../components/confirmation/confirm.vue";

/* interface NoteResponse {
  data: object;
  error: string;
  message: string;
}

interface AxiosResponse {
  data: NoteResponse;
} */

export default Vue.extend({
  components: {
    Confirm
  },
  data: () => ({
    dialog: false,
    tab: 0,
    editNoteForm: true,
    createNoteForm: true,
    notesSnackBar: false,
    noteCharacterCountValue: 100,
    maxNoteLength: 10,
    minNoteLength: 3,
    noteMessage: "",
    noteData: "",
    response: {},
    headers: [
      { text: "Note", value: "noteData" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [
      "Add Note", "Notes"
    ],
    // notes: [],
    notes: Array<Note>(),
    editedIndex: -1,
    editedItem: {
      noteData: "",
      noteid: ""
    },
    defaultItem: {
      noteData: "",
      noteid: ""
    },
    notesRule: [
      (v: boolean) => !!v || 'Please Enter Note Contents',
      (v: string) => /^\S/.test(v) || 'Blank space is not allowed at beginning in note',
      (v: string) => !!v || v.length <= 10 || 'Max 10 characters'
    ]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Note' : 'Edit Note'
    },
    form(): VForm {
      return this.$refs.createNoteForm as VForm;
    },
    updateform(): VForm {
      return this.$refs.editNoteForm as VForm;
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const token = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");

        if (token) {
          this.response = await this.axios.post('/notes/list', {
            token,
            userid
          });
          this.notes = this.response.data.data;

          // this.filteredExams = this.exams;
          // this.filteredExams.sort(this.sortExams('examName'));

        }
      }

      catch (error) {
        console.log('Something went wrong, please try again later.');
      }
    },
    async editItem(item: Note) {
      try {
        await this.editNote(item);
        this.dialog = true;
      } catch (error) {
        console.log("Something went wrong, please try again later");
      }
    },
    editNote(noteObj: Note) {
      this.editedItem.noteData = noteObj.noteData;
      // this.editedItem.noteid = noteObj._id;
      this.editedItem.noteid = noteObj.noteId;
    },
    async saveNote() {
      try {
        if (this.form.validate()) {
          const note = this.noteData;
          const userId = localStorage.getItem("userid");
          this.response = await this.axios.post("/notes/create", {
            noteData: note,
            userid: userId
          });
          if (this.response.data.error) {
            this.notesSnackBar = true;
            this.noteMessage = this.response.data.message;
          } else {
            this.noteData = "";
            this.switchToNotes();
            this.notesSnackBar = true;
            this.noteMessage = "Note created successfully";
            await this.initialize();
          }
        }
      } catch (error) {
        console.error(
          "Something went wrong, please try again later" + error.toString()
        );
      }
    },
    async updateNote() {
      try {
        if (this.updateform.validate()) {
          const noteid = this.editedItem.noteid;
          const noteData = this.editedItem.noteData;
          this.response = await this.axios.post("/notes/update", {
            noteid,
            noteData
          });
          if (this.response.data.error) {
            this.notesSnackBar = true;
            this.noteMessage = this.response.data.message;
          } else {
            this.dialog = false;
            await this.initialize();
            this.noteMessage = "Note updated successfully!";
            this.notesSnackBar = true;

          }
        }
      } catch (error) {
        console.error(
          "Something went wrong, please try again later" + error.toString()
        );
      }
    },
    switchToNotes() {
      this.tab = 1;
    },
    async deleteItem(item: Note) {
      const noteid = item._id;
      try {
        if (await this.$refs.confirm.open('Delete Note', 'Are you sure?', { color: 'red' })) {
          const token = localStorage.getItem("token");
          if (token) {
            const userid = localStorage.getItem("userid");
            if (userid) {
              await this.axios.post(`/notes/delete/${noteid}`, {
                userid: userid
              });
              this.dialog = false;
              await this.initialize();
              this.noteMessage = "Note deleted successfully!";
              this.notesSnackBar = true;
            }
          }
        }
      } catch (error) {
        console.error(
          "Something went wrong, please try again later" + error.toString()
        );
      }

      // const index = this.notes.indexOf(item)
      // confirm('Are you sure you want to delete this item?') && this.notes.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.notes[this.editedIndex], this.editedItem)
      } else {
        this.notes.push(this.editedItem)
      }
      this.close()
    },
  }

})