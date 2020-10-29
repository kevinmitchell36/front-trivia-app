<template>
  <div class="home">
    <p>{{randQuestion.question}}</p>
    <form @submit.prevent="checkAnswer()">
      <div v-for="(option, index) in options" :key="index">
          <input type="radio" name="answer" id="first" :value="option" v-model="choice" required>
          <label for="first">{{option}} {{index}}</label>
      </div>
      <div v-if="nextQuestion == false">
        <button type="Submit">Check Answer</button>
      </div>
    </form>
    <!-- Too many v-if directives? Todo - research potential pitfalls -->
      <div>
        <h1>{{feedback}}</h1>
      </div>
      <div v-if="nextQuestion === true && numberLeft > 0">
        <button @click="getSingleQuestion()">Next</button>
      </div>
      <div v-if="numberLeft < 10">
        <p>You got {{numberCorrect}} out of 10 correct so far!!!</p>
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
      numberCorrect: 0,
      correctAnswer: ""
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
    // This method is to long. Todo - break into smaller methods
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
      this.correctAnswer = this.options[0]
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
    // Hard code of 9 (line 79). Todo - pull from db or user?
    checkAnswer: function () {
      if(this.choice === this.randQuestion.correct) {
        this.feedback = `That's right! ${this.randQuestion.correct} is the right answer!`
        this.numberCorrect += 1
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