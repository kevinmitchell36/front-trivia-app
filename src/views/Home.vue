<template>
  <div class="home">
    <p>{{randQuestion.question}}</p>
    <form>
      <input type="radio" name="answer" id="first" :value="options[0]" v-model="choice">
      <label for="first">{{options[0]}}</label>
      <br>
      <input type="radio" name="answer" id="first" :value="options[1]" v-model="choice">
      <label for="first">{{options[1]}}</label>
      <br>
      <input type="radio" name="answer" id="first" :value="options[2]" v-model="choice">
      <label for="first">{{options[2]}}</label>
      <br>
      <input type="radio" name="answer" id="first" :value="options[3]" v-model="choice">
      <label for="first">{{options[3]}}</label>
      <br>
      <br>
      <br>
      {{choice}}
    </form>
      <button @click="checkAnswer()">Check Answer</button>
      {{correct}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      questions: [],
      randQuestion: {},
      choice: "",
      options: [],
      correct: null
    }
  },
  methods: {
    getQuestions: function () {
      axios.get("https://damp-atoll-89484.herokuapp.com/api/questions")
      .then((response) => {
        console.log(response.data)
        this.questions = response.data
      }).then((this.getSingleQuestion))
    },
    getSingleQuestion: function () {
      this.randQuestion = this.questions[Math.floor(Math.random() * this.questions.length)]
      this.options.push(this.randQuestion.correct)
      this.randQuestion.incorrect.forEach(wrong => {
        this.options.push(wrong)
      })
      console.log(this.options)
      this.shuffleOptions()
    },
    shuffleOptions: function () {
      for(let i = this.options.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = this.options[i]
        this.options[i] = this.options[j]
        this.options[j] = temp
      }
      console.log(this.options)
    },
    checkAnswer: function () {
      if(this.choice === this.randQuestion.correct) {
        this.correct = "That's right!"
      } else {
        this.correct = "That's wrong..."
      }
    }
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style>

</style>