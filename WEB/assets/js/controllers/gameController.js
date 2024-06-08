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
            minutes : 1,
            secondes: 0
        }
    }
);