
//"node card.js" will display a prompt to enter a question and save it

// "node card.js basic" will display a random question from the basic.txt file

// "node card.js cloze" will display a random question from the cloze.txt file


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
else if (process.argv[2] === "basic") {
    readBasicFile();
}
else if (process.argv[2] === "cloze") {
 
 readClozeFile();
}



function readClozeFile(){

fs.readFile("cloze.txt",  "utf8" , read);



function read(err, data){
var questionArr = [];
if (err) {
		console.log(err);
		return;

	}

questionArr = data.split("\n");

for (var i = 0 ; i < questionArr.length ; i++){ 

    var questionAnswer = questionArr[i].split(":");


if (questionAnswer[0] === "cloze"){
 var object = new ClozeFlashcard(questionAnswer[1], questionAnswer[2]);
   arrayCloze.push(object);

}
}
displayGame();
}
}


function readBasicFile(){
var questionArr = [];
fs.readFile("basic.txt",  "utf8" , read);



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

   else {

 var length = arrayCloze.length;
        random = Math.floor(Math.random() * length) ;
      var question = arrayCloze[random].text;
      

     question = question.substring(0, question.indexOf(".")) + "_______" + question.substring(question.indexOf(".")+1 );
     console.log(question);
promptAnswerCloze();
   }
}



function promptAnswerCloze(){

    inquirer.prompt([
        {
            name: "answer",
            type: "input",
            message: "Enter missing part: "

        }
    ]).then(function(ans){

        if (arrayCloze[random].cloze === ans.answer) {
            console.log("Correct");
            
        }
        else {
            console.log("Wrong.. The answer is ");
            arrayCloze[random].showCloze();
        }
    });
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
            message: "Enter text(put a dot where the answer should be): ",
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


var log = type + ":" +  q.question + ":" + q.answer + "\n";

if (type === "basic") {
    


var basic = new BasicFlashcard(q.question, q.answer);
arr.push(basic);

fs.appendFile("basic.txt", log, errors);
}
else{
    
var cloze = new ClozeFlashcard(q.question, q.answer);
arr.push(basic);
fs.appendFile("cloze.txt", log, errors);
}

console.log(log);
 


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



