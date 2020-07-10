// written by Alex Davidson
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Tetra-alkyl Ammonium Halides can be found in what type of cleaning product?", ["Clorox bleach", "Lysol all-purpose cleaner","Oxiclean", "Hand sanitizer"], "Lysol all-purpose cleaner"),
    new Question("What is the most common cause of dementia in the U.S.?", ["Huntington’s disease", "Parkinson’s disease", "Multiple sclerosis", "Alzheimer’s disease"], "Alzheimer’s disease"),
    new Question("Recycling efforts have attempted to curb the use of plastic, but in the U.S. alone only 30 percent of plastic is recycled. Globally, how many plastic bottles are produced every second?", ["200", "2,000","20,000", "200,000"], "20,000"),
    new Question("Having good tread on your shoes helps prevent slips and falls. It’s time to replace those shoes when the worn patch becomes larger than a WHAT?", ["AA battery", "Quarter", "Tealight candle", "Can of soda"], "AA battery"),
	new Question("Which of the following daily objects cannot carry viruses and bacteria, such as the novel coronavirus?", ["Your cellphone", "A face mask", "Money", "They can all carry viruses and bacteria!"], "They can all carry viruses and bacteria!"),
	new Question("Recruited by George Westinghouse, Reginald Fessenden was the first chair of electrical engineering at Pitt and was known as the Father of WHAT?", ["Radio", "Television","The gramophone", "Automated manufacturing"], "Radio")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();