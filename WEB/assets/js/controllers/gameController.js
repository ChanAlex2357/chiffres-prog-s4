gameApp.controller(
    'gameController',
    function($scope,$rootScope,$interval,timer,validation){
        // le chiffre aleatoire en 1 et 100
        $scope.goldenNumber = 567;
        // Les chffres a utiliser lors du calcul
        $scope.gameNumbers = [1,2,3,4,5,6,7];
        // L'etat de la partie
        $scope.gameStatus = "stop";
        $scope.caseStatus = "invisible";
        $scope.playerOperation ;
        // Le timer
        $scope.timer = $rootScope.gameConfig.timer;
        let timerID ;

        $scope.playerValidate = {name:''};
    /// Functions
        /// Transformer le chiffre en texte de temps
        $scope.timerLayout = function(){
            return timer.fullTimerCaractere($scope.timer);
        }
        /// Arreter le timer
        $scope.stopCountdown = function(){
            $interval.cancel(timerID);
            $scope.gameStatus = "stop";
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
        let b = []
        b.length
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
                $scope.playerValidate =  validation.getPlayerValidate($scope.validations);
            }
        }
        $scope.clearOperation = function(){
            $scope.playerOperation = "";
        }
        $scope.addToOperaiion = function(operate){
            $scope.playerOperation += operate;
        }
    }
);