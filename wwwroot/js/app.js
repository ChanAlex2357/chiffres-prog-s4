/// Declaration du module rally app
let gameApp = angular.module("GameApp",["ngRoute"]);
/// Configuration des mappings gerer dans rally app
gameApp.config(['$routeProvider' ,  $routeProvider =>{
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home/formulaire-joueur.html'
        })
        .when('/game', {
            templateUrl: 'views/game.html',
            controller: 'gameController'
        })
        .otherwise({
            redirectTo:'/game'
        });
}]);
gameApp.run(function($rootScope){
    $rootScope.gameConfig ={
        timer : {
            hours   : 0,
            minutes : 1,
            secondes: 0
        },
        numbersIsa : 7,
        operations : [
            "+","-","*","/","(",")"
        ]
    }
    
    $rootScope.players = [];
    $rootScope.addPlayer = function(playerName,starterPoint = 0){
        $rootScope.players.push({
            name:playerName,
            point:starterPoint,
            validation:'allowed',
            answer:null,
            time:null
        });
    }
    $rootScope.addPlayer('Player 1');
    $rootScope.addPlayer('Player 2');
})
// CONTROLLERS
gameApp.controller(
    'AppController',
    function($rootScope){
        $rootScope.text = "NUMBER"
    }
);