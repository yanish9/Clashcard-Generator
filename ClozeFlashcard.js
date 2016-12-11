var inquirer = require("inquirer");

function ClozeFlashcard (text , cloze) {

this.text = text;
this.cloze = cloze;

this.showText = function (){

    console.log(this.text);

}

this.showCloze = function(){

    console.log(this.cloze);
}



}


module.exports = ClozeFlashcard;
