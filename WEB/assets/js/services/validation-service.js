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
})