gameApp.service('validation' , function(){
    this.checkValidation = function(answer,gameStatus){
        let message = null;
        if(gameStatus == "stop"){
            message = "Veuillez attendre que le jeu commences";
        }
        else if( answer==null){
            message = "La reponse ne doit pas etre vide"
        }
        return message;
    }
    this.timeCompare = function(A,B){
        if (A.time < B.time) {
            return -1;
        }
        if (A.time > B.time) {
            return 1;
        }
        return 0;
    }
    this.answerCompare = function(A,B) {
        console.log(A.answer+" / "+B.answer);
        if (A.answer < B.answer) {
            return -1;
        }
        if (A.answer > B.answer) {
            return 1;
        }
        if (A.answer == B.answer) {
            if (A.time < B.time) {
                return -1;
            }
            if (A.time > B.time) {
                return 1;
            }
            return 0;
        }
    }

    this.getPlayerValidate = function(validations){
        validations.sort(this.answerCompare);
        validations.reverse();
        return validations[0];
    }
});