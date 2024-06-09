gameApp.controller(
    'gameController',
    function($scope,$rootScope){
        let numbresIsa = 7;
        // le chiffre aleatoire en 1 et 100
        $scope.goldenNumber = 567;
        // Les chffres a utiliser lors du calcul
        $scope.gameNumbers = [1,2,3,4,5,6,7];
        // L'etat de la partie
        $scope.gameStatus = "stop";
        // Le timer
        $scope.timer = {
            hours   : 0,
            minutes : 0,
            secondes: 10
        }

    /// Functions
        /// Transformer le chiffre en texte de temps
        $scope.timerCaractere = function(nb){
            return nb >= 10 ? nb : "0"+nb;
        }
        $scope.fullTimerCaractere = function(timer){
            return $scope.timerCaractere(timer.hours)+":"+$scope.timerCaractere(timer.minutes)+":"+$scope.timerCaractere(timer.secondes);
        }

        /// Lancer un countdown
        $scope.countdowm = function(){
            let timerID ;
            // while( timerCount(timer) > 0){
            timerID = setInterval(
                function(){

                    dicreaseTimer($scope.timer);
                    $scope.$apply();
                    if(timerCount($scope.timer)<=0){
                        clearInterval(timerID);
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
    }
);
function timerCount(timer){
    return (timer.hours*10000) + (timer.minutes*100) + (timer.secondes);
}
function dicreaseTimer(timer){
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
