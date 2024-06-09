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
                    timer.dicreaseTimer($scope.timer);
                    if(timerCount($scope.timer)<=0){
                        $interval.cancel(timerID);
                    }
                }
                ,1000
            )
        }
        /// Demarrer le jeu
        $scope.startGame = function(){
            /// Changer l'etat du jeu
            $scope.gameStatus = "run";
            /// Lancer le countdown
            $scope.countdowm();
        }
        $scope.validations = [];
        $scope.validationAnswer = function(player,answer){
            if(answer == null){return}
            let time ={
                hr :$scope.timer.hours,
                mnt:$scope.timer.minutes,
                sec:$scope.timer.secondes
            } ;
            player.validation = 'disabled';
            $scope.validations.push (
                {player,answer,time}
            );
        }
    }
);