gameApp.service('validation' , function(){
    this.checkValidation = function(answer,gameStatus){
        let message = null;
        if(gameStatus == "stop"){
            message = "Veuillez attendre que le jeu commences";
        }
        else if(answer==null){
            message = "La reponse ne doit pas etre vide"
        }
        return message;
    }
    this.answerCompare = function(A,B){
        console.log(A.distance+" / "+B.distance);
        if ( (B.answer === null) || (A.distance < B.distance) ) {
            return -1;
        }
        if ( (A.answer === null) || (A.distance > B.distance) ) {
            return 1;
        }
        if (A.distance == B.distance) {
            if (A.time < B.time) {
                return 1;
            }
            if (A.time > B.time) {
                return -1;
            }
            return 0;
        }
    }
    this.getPlayerValidate = function(validations){
        validations.sort(this.answerCompare);
        return validations;
    }
});