gameApp.controller(
    'gameController',
    function($scope,$rootScope,$interval,timer,validation,gameNumber){
        // le chiffre aleatoire en 1 et 100
        $scope.goldenNumber = gameNumber.generateGolden();
        // Les chffres a utiliser lors du calcul
        $scope.gameNumbers = gameNumber.generateNumbers(7,1,100);
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
        let timerID ;

        $rootScope.players.forEach( player => {
            player.validation = 'allowed'
        });


        $scope.playerValidate = {name:''};
    /// Functions
        /// Transformer le chiffre en texte de temps
        $scope.timerLayout = function(){
            return timer.fullTimerCaractere($scope.timer);
        }
        /// Arreter le timer
        $scope.timerState = "allowed";
        $scope.stopCountdown = function(){
            $interval.cancel(timerID);
            $scope.gameStatus = "stop";
            $scope.timerState = "disabled";
            return; 
        }
        /// Lancer un countdown
        $scope.countdowm = function(){
            timerID = $interval(
                function(){
                    if( timer.timerCount($scope.timer)<=0){
                        $scope.stopCountdown();
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
        $scope.validations = [];
        $scope.validationAnswer = function(player,answer){
            let checkMessage = validation.checkValidation(answer,$scope.gameStatus);
            if(checkMessage != null){
                alert(checkMessage);
                return;
            }
            let time_player = timer.truncTime($scope.timer);
            player.validation = 'disabled';
            $scope.validations.push (
                {player,answer, time : timer.timerCount(time_player) }
            );
            /// Verifier si on a fait toutes les validations
            if($scope.validations.length == $rootScope.players.length){
                $scope.caseStatus = "visible";
                $scope.stopCountdown();
                $scope.clearOperation();
                $scope.gameStatus = "validation";
                $scope.playerValidate =  validation.getPlayerValidate($scope.validations);
            }
        }
        $scope.clearOperation = function(){
            $scope.playerOperation = "";
            $scope.gameNumbers.forEach(gameNumber => {
                gameNumber.used = false;
            });
        }
        $scope.operationResult = 0;
        $scope.submitOperation = function(){
            $scope.operationResult = eval($scope.playerOperation);
            /// Verification de la reponse
            if($scope.playerValidate.answer == Number.parseInt($scope.operationResult) ){
                alert("RESULT is correct : "+$scope.operationResult);
                let current_point = Number.parseInt($scope.playerValidate.player.point)
                $scope.playerValidate.player.point = current_point + 1;
            }
            else{
                alert("RESULT is incorect ! : "+$scope.operationResult);
            }
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
    }
);