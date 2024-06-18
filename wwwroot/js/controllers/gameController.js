gameApp.controller(
    'gameController',
    function($scope,$rootScope,$interval,timer,validation,gameNumber,$location){
        $scope.goldenNumber;
        $scope.gameNumbers;
        $scope.gameStatus
        $scope.caseStatus;
        $scope.playerOperation;
        $scope.timer;
        $scope.timerState;
        $scope.validations = [];
        let timerID ;
    /// Functions
        /// Transformer le chiffre en texte de temps
        $scope.timerLayout = function(){
            return timer.fullTimerCaractere($scope.timer);
        }
        /// Arreter le timer
        $scope.stopCountdown = function(gameState = "stop"){
            $interval.cancel(timerID);
            $scope.gameStatus = gameState;
            $scope.timerState = "disabled";
            return; 
        }
        /// Lancer un countdown
        $scope.countdowm = function(){
            timerID = $interval(
                function(){
                    if( timer.timerCount($scope.timer)<=0){
                        if($scope.validations[0].answer == null && $scope.validations[1].answer == null) {
                            alert("Aucun gagnant car aucune reponse valide");
                            $scope.stopCountdown();
                            $scope.initGame();
                            return;
                        }
                        $scope.validationState();
                        return;
                    }
                    timer.dicreaseTimer($scope.timer);
                }
                ,1000
            )
            $scope.timerState = "disabled";
        }
        /// Demarrer le jeu
        $scope.startGame = function(){
            if(timer.timerCount($scope.timer)<=0){
                return;
            }
            /// Changer l'etat du jeu
            $scope.gameStatus = "run";
            /// Lancer le countdown
            $scope.countdowm();
        }
        
/// V A L I D A T I O N
    $scope.validationObject = function(player_ , answer_ = null , distance_ = null , time_ = null){
        return {
            player : player_,
            answer : answer_,
            distance : distance_,
            time : time_
        }
    }
    $scope.initValidation = function(){
        $scope.validations = [];
        $rootScope.players.forEach( player => {
            player.validation  = 'allowed',
            player.answer = null;
            $scope.validations.push($scope.validationObject(player));
        });
    }
    $scope.validationAnswer = function(player,index){
        let checkMessage = validation.checkValidation(player.answer,$scope.gameStatus);
        if(checkMessage != null){
            alert(checkMessage);
            return;
        }
        let time_player = timer.truncTime($scope.timer);
        player.validation = 'disabled';
        $scope.validations[index] = $scope.validationObject(player,player.answer,Math.abs($scope.goldenNumber - player.answer),timer.timerCount(time_player));
        /// Verifier si on a fait toutes les validations
        if($scope.validations[0].answer !== null && $scope.validations[1].answer !== null) {
            $scope.validationState();
        }
    }
    $scope.validationState = function(){
        $scope.caseStatus = "visible";
        $scope.stopCountdown("validation");
        $scope.clearOperation();
        $scope.validations.sort(validation.answerCompare);
    }


/// O P E R A T I O N
    $scope.operationResult = 0;
    $scope.clearOperation = function(){
        $scope.playerOperation = "";
        $scope.gameNumbers.forEach(gameNumber => {
            gameNumber.used = false;
        });
    }
    $scope.addPlayerPoint = function(player,point_){
        let current_point = Number.parseInt(player.point);
        player.point = current_point + 1; 
    }
    $scope.submitOperation = function(){
        $scope.operationResult = eval($scope.playerOperation);
        /// Verification de la reponse
        if($scope.validations[0].answer == Number.parseInt($scope.operationResult) ){
            alert("RESULT is correct : "+$scope.operationResult);
            $scope.addPlayerPoint($scope.validations[0].player)
        }
        else{
            alert("RESULT is incorect ! : "+$scope.operationResult);
            $scope.addPlayerPoint($scope.validations[1].player)
        }
        $scope.initGame();
    }
    $scope.addToOperaiion = function(operate){
        if($scope.gameStatus != 'validation'){
            return;
        }
            if(operate.used == true){
                return;
            }
            let value = operate.value;
            if( value === undefined){
                value = operate;
            }
            $scope.playerOperation += ''+value;
            operate.used = true;
            return;
    }

    $scope.initGame = function(){
        // le chiffre aleatoire en 1 et 100
        $scope.goldenNumber = $rootScope.numberOrigin;
        // Les chffres a utiliser lors du calcul
        $scope.gameNumbers = $rootScope.playNumbers;
        if($scope.goldenNumber == null || $scope.gameNumbers.length < 7){
            $location.path('/home');
            $rootScope.errorMessage = 'Configuration de jeu incomplete';
        }
        // L'etat de la partie
        $scope.gameStatus = "stop";
        $scope.caseStatus = "invisible";
        $scope.playerOperation ;
        // Le timer
        $scope.timer = {
            hours   : 0,
            minutes : 1,
            secondes: 0
        };
        $scope.timerState = "allowed";
        $scope.initValidation();
    }
    $scope.initGame();
}


);