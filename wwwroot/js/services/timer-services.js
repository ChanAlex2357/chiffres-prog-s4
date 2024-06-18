gameApp.service('timer',function(){
    this.timerCaractere = function (nb){
        return nb >= 10 ? nb : "0"+nb;
    }

    this.fullTimerCaractere = function (timer){
        return this.timerCaractere(timer.hours)+":"+this.timerCaractere(timer.minutes)+":"+this.timerCaractere(timer.secondes);
    }

    this.timerCount = function (timer){
        return (timer.hours*10000) + (timer.minutes*100) + (timer.secondes);
    }

    this.dicreaseTimer = function (timer){
        // decrease second
        if(timer.secondes == 0 && timer.minutes > 0){
            timer.secondes = 59;
            // decrease minute
            if(timer.minutes == 0 && timer.minutes > 0){
                timer.minutes = 59;
                timer.hours = timer.hours > 0 ? timer.hours-1:0;
            }
            else{timer.minutes-=1}
        }
        else{timer.secondes-=1}
    }
    this.truncTime = function(timer){
        return {
            hours : timer.hours ,
            minutes: timer.minutes ,
            secondes: timer.secondes 
        } ;
    }
})