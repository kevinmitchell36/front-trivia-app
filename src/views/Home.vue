<template>
  <div class="home">
    <p>{{randQuestion.question}}</p>
    <form>
      <div v-for="option in options" :key="option">
        <input type="radio" name="answer" id="first" :value="option" v-model="choice">
        <label for="first">{{option}}</label>
      </div>
    </form>
      <button @click="checkAnswer()">Check Answer</button>
      <div v-if="nextQuestion === true">
        <p>{{feedback}}</p>
        <button @click="getSingleQuestion()">Next</button>
      </div>
      <div>
        {{numberLeft}}
      </div>
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
      feedback: null,
      nextQuestion: false,
      numberLeft: 3
    }
  },
  methods: {
    getQuestions: function () {
      axios.get("https://damp-atoll-89484.herokuapp.com/api/questions")
      .then((response) => {
        console.log(response.data.length)
        this.questions = response.data
      }).then((this.getSingleQuestion))
    },
    getSingleQuestion: function () {
      this.nextQuestion = false
      let selectedIndex =  Math.floor(Math.random() * this.questions.length)
      this.randQuestion = this.questions[selectedIndex]
      console.log(this.randQuestion)
      this.questions.splice(selectedIndex, 1)
      console.log(this.questions.length)
      this.options = []
      this.options.push(this.randQuestion.correct)
      this.randQuestion.incorrect.forEach(wrong => {
        this.options.push(wrong)
      })
      this.shuffleOptions()
    },
    shuffleOptions: function () {
      for(let i = this.options.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = this.options[i]
        this.options[i] = this.options[j]
        this.options[j] = temp
      }
    },
    checkAnswer: function () {
      if(this.choice === this.randQuestion.correct) {
        this.feedback = "That's right!"
      } else {
        this.feedback = "That's wrong..."
      }
      if(this.questions.length > 17) {
        this.nextQuestion = true
      }
      this.numberLeft -= 1
    }
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style>

</style>