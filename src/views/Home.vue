<template>
  <div class="home">
    <p>{{questions[0].question}}</p>
    <form>
      <input type="radio" name="answer" id="first" :value="questions[0].correct" v-model="choice">
      <label for="first">{{questions[0].correct}}</label>
      <br>
      <input type="radio" name="answer" id="first" :value="questions[0].incorrect[0]" v-model="choice">
      <label for="first">{{questions[0].incorrect[0]}}</label>
      <br>
      <input type="radio" name="answer" id="first" :value="questions[0].incorrect[1]" v-model="choice">
      <label for="first">{{questions[0].incorrect[1]}}</label>
      <br>
      <input type="radio" name="answer" id="first" :value="questions[0].incorrect[2]" v-model="choice">
      <label for="first">{{questions[0].incorrect[2]}}</label>
      <br>
      {{choice}}
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      questions: [],
      choice: ""
    }
  },
  methods: {
    getQuestions: function () {
      axios.get("https://damp-atoll-89484.herokuapp.com/api/questions")
      .then((response) => {
        console.log(response.data);
        this.questions = response.data;
      })
    },
    checkanswer() {

    }
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style>

</style>