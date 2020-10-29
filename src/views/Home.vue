<template>
  <div class="home">
    <p>{{randQuestion.question}}</p>
    <form>
      <div v-for="option in options" :key="option">
        <input type="radio" name="answer" id="first" :value="option" v-model="choice">
        <label for="first">{{option}}</label>
      </div>
    </form>
      <div v-if="nextQuestion == false">
        <button @click="checkAnswer()">Check Answer</button>
      </div>
      <div>
        <h1>{{feedback}}</h1>
      </div>
      <div v-if="nextQuestion === true && numberLeft > 0">
        <button @click="getSingleQuestion()">Next</button>
      </div>
      <div v-if="numberLeft < 10">
        <p>You got {{correct}} out of 10 correct so far!!!</p>
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
      numberLeft: 10,
      correct: 0
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
      this.feedback = null
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
        this.feedback = `That's right! ${this.randQuestion.correct} is the right answer!`
        this.correct += 1
      } else {
        this.feedback = `So close! The correct answer is ${this.randQuestion.correct}.`
      }
      if(this.questions.length > this.questions.length - 9) {
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