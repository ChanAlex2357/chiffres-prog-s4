gameApp.service('validation' , function(){
    this.validationsList = [];
    this.addValidation = function(player_val,answer_val,time_val){
        this.validationsList.push({
            player : player_val,
            answer : answer_val,
            time : time_val
        })
    }
})