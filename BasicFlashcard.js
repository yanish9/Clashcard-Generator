var inquirer = require("inquirer");

function BasicFlashcard (front , back) {

this.back = back;
this.front = front;

this.showBack = function (){

    console.log(this.back);

}

this.showFront = function(){

    console.log(front);
}


this.showPromptQuestion = function (){


}

}


module.exports = BasicFlashcard;
