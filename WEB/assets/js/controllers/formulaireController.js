gameApp.controller(
    'playerFormController',
    function($scope,$rootScope){
        let players = $rootScope.players;
        let starterPoint = 0;

        // Ajouter un joueur dans la liste des joueurs
        $scope.addPlayer = function(){
             players.push({
                name: $scope.playerName,
                point:starterPoint
             });
        };
        // Supprimmer un joueur dans la liste
        $scope.removePlayer = function($index){
            players.pop({
               $index
            });
       };
    }
);