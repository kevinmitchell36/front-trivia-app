#### front-trivia-app

# Project - Tandem Apprentice Challenge || Trivia Time!!
This project is for Tandem's Apprentice Software Engineer program.
My goal was to create an application that displays multiple-choice answers to some trivia questions.
I was provided a JSON file with the data for each question and asked to make an app with these assumptions:
* A round of trivia has 10 questions
* All questions are multiple-choice
* Results can update via any interaction of my choosing

## Quick View
You may follow the setup instructions below, or, for a quick view, visit [Tandem Trivia](https://www.hirekevinmitchell.com/). 

Questions JSON is deployed on heroku [here](https://damp-atoll-89484.herokuapp.com/api/questions). Repo can be view [here](https://github.com/kevinmitchell36/trivia-app)

## Setup
Clone the repo and run:
```
npm install
```
in your terminal or console. This project has the bear minimum of dependencies.
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Issues and Bugs
-- More robust tests needed:

* Tests for axios request
* Tests for app before and after states
* Tests for methods

-- User can continue to click on elements after the checkAnswer() method has run.

-- Backend CORS origins is set to any but should be multiple arguments:
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```




