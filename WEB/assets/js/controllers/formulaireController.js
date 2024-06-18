gameApp.controller(
    'playerFormController',
    function($scope,$rootScope){
        let starterPoint = 0;
        let isa = 2;
        $scope.playerNumber = isa;
        isa = $scope.playerNumber;
        // Ajouter un joueur dans la liste des joueurs
        $scope.addPlayer = function(){
             $rootScope.players.push({
                name: $scope.playerName,
                point:starterPoint
             });
             $scope.playerName ='';
             $scope.playerNumber+=1;
        };
        // Supprimmer un joueur dans la liste
        $scope.removePlayer = function($index){
            $rootScope.players.pop({
               $index
            });
            $scope.playerNumber-=1;
       };

       $scope.increase = function(nb){
         if ($scope.playerNumber > 2){
            return "YES "+nb;
         }
         return "NO";
       }
    }
);