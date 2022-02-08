<template>
  <div class="home">
    <div class="container" v-if="numberLeft > 0">
      <p class="tracker">Question {{numberAnswered}} of 10</p>
      <div class="question-wrapper">
        <p id="question">{{randQuestion.question}}</p>
      </div>
      <div class="wrapper">
        <div v-for="(option, index) in options" :key="index">
          <div v-for="(value, key, index) in option" 
            :key="index"
            @click="isAnswered == false ? checkAnswer(value, key, $event) : $event.preventDefault()" >
            <!-- Works. But it smells -->
            <p id="answers" v-bind:class="{correct: isAnswered && key === 'correct', incorrect: isAnswered && key === 'incorrect' && userAnswer === value}">{{value}}</p>
          </div>  
        </div>
      </div>
    </div>
    <!-- Too many v-if directives? Todo - research potential pitfalls -->
    <div class="feedback">
      <div>
        <p>{{feedback}}</p>
      </div>
      <div v-if="nextQuestion === true && numberLeft > 0">
        <button @click="getSingleQuestion()">Next</button>
      </div>
    </div>
    <div class="score" v-if="numberLeft < 10">
      <p>You got {{numberCorrect}} out of 10 correct!!!</p>
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
      correctAnswer: "",
      options: [],
      feedback: null,
      nextQuestion: false,
      numberLeft: 10,
      numberCorrect: 0,
      numberAnswered: 0,
      userAnswer: "",
      isAnswered: false
    }
  },
  methods: {
    getQuestions: function () {
      axios.get("https://damp-atoll-89484.herokuapp.com/api/questions")
      .then((response) => {
        this.questions = response.data
      }).then((this.getSingleQuestion))
    },
    // This method is to long. Todo - break into smaller methods
    getSingleQuestion: function () {
      this.numberAnswered += 1
      this.feedback = null
      this.nextQuestion = false
      this.isAnswered = false
      let selectedIndex =  Math.floor(Math.random() * this.questions.length)
      this.randQuestion = this.questions[selectedIndex]
      this.questions.splice(selectedIndex, 1)
      this.correctAnswer = this.randQuestion.correct
      this.options = []
      this.options = [ { correct: this.randQuestion.correct} ]
      this.randQuestion.incorrect.forEach(wrong => {
        this.options.push({ incorrect: wrong })
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
    // Hard code of 9 (line 79). Todo - pull from db or user?
    checkAnswer: function (value, key, event) {
      console.log(event)
      this.userAnswer = value
      this.isAnswered = true
      if(value === this.randQuestion.correct) {
        this.feedback = `That's right! ${this.randQuestion.correct} is the right answer!`
        this.numberCorrect += 1
      } else {
        this.feedback = `So close! The correct answer is ${this.randQuestion.correct}.`
      }
      if(this.questions.length > this.questions.length - 9) {
        this.nextQuestion = true
      }
      this.numberLeft -= 1
    },
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style>
.correct {
  border: green 5px solid;
}

.incorrect {
  border: red 5px solid;
}

.question-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
}

.question-wrapper #question {
  font-size: 1.5rem;
}

.tracker {
  position: relative;
  top: 0;
  left: 40vw;
  margin-bottom: 1.5rem;
}

.wrapper {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
}

#answers {
  padding: 1rem;
  background: #7a7f80;
  color: #f4f4f4 
}

.feedback {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  position: relative;
  padding: 15px;
  margin-top: 1.5rem;
}

.feedback > div {
  margin-right: 20px;
}

.feedback >  div > p {
  font-size: 2rem;
}

button {
  width: 60px;
  height: 30px;
  background: #333;
  color: #f4f4f4 
}



</style>