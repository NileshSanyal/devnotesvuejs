/*
Explanation:
In the Vue template syntax, we can use the ref attribute on a Vue instance or a DOM element. If ref is used in a v-for loop, an array of Vue instances or DOM elements is retreived.

This is why this.$refs can either return Vue | Element | Vue[] | Element[].

In order for TypeScript to know which type is being used, we need to cast the value.

We can either do:

(this.$refs.form as Vue).validate() or (<Vue>this.$refs.form).validate()

We cast it to Vue because v-form is a Vue instance (component) and not an Element.

The v-form instance has a validate method that returns a boolean, so we need to use an intersection type literal:



*/

import Vue from "vue";
export type VForm = Vue & { validate: () => boolean };

