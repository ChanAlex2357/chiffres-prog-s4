gameApp.controller(
    'gameController',
    function($scope,$rootScope,$interval,timer,validation){
        // le chiffre aleatoire en 1 et 100
        $scope.goldenNumber = 567;
        // Les chffres a utiliser lors du calcul
        $scope.gameNumbers = [1,2,3,4,5,6,7];
        // L'etat de la partie
        $scope.gameStatus = "stop";
        // Le timer
        $scope.timer = $rootScope.gameConfig.timer;
    /// Functions
        /// Transformer le chiffre en texte de temps
        $scope.timerLayout = function(){
            return timer.fullTimerCaractere($scope.timer);
        }
        /// Lancer un countdown
        $scope.countdowm = function(){
            let timerID ;
            timerID = $interval(
                function(){
                    if(timer.timerCount($scope.timer)<=0){
                        $interval.cancel(timerID);
                        $scope.gameStatus = "stop";
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
        $scope.validationAnswer = function(player,answer){
            let checkMessage = validation.checkValidation(answer,$scope.gameStatus);
            if(checkMessage != null){
                alert(checkMessage);
                return;
            }
            let time = timer.truncTime($scope.timer);
            player.validation = 'disabled';
            $scope.validations.push (
                {player,answer,time}
            );
        }
    }
);