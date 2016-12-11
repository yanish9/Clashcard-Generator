var BasicFlashcard  = require("./BasicFlashcard");
var ClozeFlashcard = require("./ClozeFlashcard");
var inquirer = require("inquirer");
 var fs = require('fs');

var type = "";
var arr = [];
var arrayBasic = [];
var arrayCloze = [];

var Basic = new BasicFlashcard();


if (process.argv[2] === undefined){
displayBasicCloze();

}
else 
{
 readQuestionsFile();
}


function readQuestionsFile(){
var questionArr = [];
fs.readFile("log.txt",  "utf8" , read);



function read(err, data){

if (err) {
		console.log(err);
		return;

	}

questionArr = data.split("\n");

for (var i = 0 ; i < questionArr.length ; i++){ 

    var questionAnswer = questionArr[i].split(":");

if (questionAnswer[0] === "basic"){
     
    var object = new BasicFlashcard(questionAnswer[1], questionAnswer[2]);
    arrayBasic.push(object);
   // console.log(arrayBasic);
  
}
else if (questionAnswer[0] === "cloze"){
 var object = new ClozeFlashcard(questionAnswer[1], questionAnswer[2]);
   arrayCloze.push(object);

}
}

displayGame();
  
} 
}

var random;

function displayGame(){
  

   if (process.argv[2] === "basic") {
       
       var length = arrayBasic.length;
        random = Math.floor(Math.random() * length) ;
       arrayBasic[random].showFront();

        console.log(arrayBasic);
       promptAnswerBasic(); 

   }
}



function promptAnswerBasic(){

    inquirer.prompt([
        {
            name: "answer",
            type: "input",
            message: "Answer"

        }
    ]).then(function(ans){

        if (arrayBasic[random].back === ans.answer) {
            console.log("Correct");
            
        }
        else {
            console.log("Wrong.. The answer is ");
            arrayBasic[random].showBack();
        }
    });
}

function displayBasicCloze(){


inquirer.prompt([

    {
        choices : ["Basic Flashcard", "Cloze Flashcard"],
        message: "Choose",
        type: "list",
        name: "choice"
    }
]).then(promptUser)}



function promptUser (answer){

if( answer.choice === "Basic Flashcard"){
  
   type = "basic";
    inquirer.prompt([
        {
            name: "question",
            message: "Enter front: ",
            type: "input",
            default: ''
        },
        {
            name: "answer",
            message: "Enter back: ",
            type: "input",
            default: ''
        }
    ]).then(saveAndpromptAnother)
    .then(decideToPromptAgain);
}

else if (answer.choice === "Cloze Flashcard") {
    
      type = "cloze";
    inquirer.prompt([
        {
            name: "question",
            message: "Enter text: ",
            type: "input",
            default: ''
        },
        {
            name: "answer",
            message: "Enter cloze: ",
            type: "input",
            default: ''
        }
    ]).then(saveAndpromptAnother)
    .then(decideToPromptAgain);

}


}


function decideToPromptAgain(an){
   if(an.another){
       displayBasicCloze();
   }
}




function saveAndpromptAnother (q){

if (type === "basic") {
    

var basic = new BasicFlashcard(q.question, q.answer);
arr.push(basic);
}
else{
    
var cloze = new ClozeFlashcard(q.question, q.answer);
arr.push(basic);
}

var log = type + ":" +  q.question + ":" + q.answer + "\n";
console.log(log);
 fs.appendFile("log.txt", log, errors);


 function errors(err){
    console.log(err);
}

return inquirer.prompt([
{
            name: "another",
            message: "Enter another question?",
            type: "confirm",
            default: ''
        }

]);

}



