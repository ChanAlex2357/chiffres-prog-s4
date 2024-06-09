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
        numbersIsa : 7
    }
    $rootScope.players = [
        {
            name:'Player 1',
            point:0,
            validation : 'allowed'
        },
        {
            name:'Player 2',
            point:0 ,
            validation : 'allowed'
        }
    ];
})
// CONTROLLERS
gameApp.controller(
    'AppController',
    function($rootScope){
        $rootScope.text = "NUMBER"
    }
);