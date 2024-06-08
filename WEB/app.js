/// Declaration du module rally app
let gameApp = angular.module("GameApp",["ngRoute"]);
/// Configuration des mappings gerer dans rally app
gameApp.config(['$routeProvider' ,  $routeProvider =>{
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home/formulaire-joueur.html'
        })
        .when('/game', {
            templateUrl: 'views/game.html'
        })
        .otherwise({
            redirectTo:'/game'
        });
}]);
gameApp.run(function($rootScope){
    $rootScope.players = [
        {
            name:'Player 1',
            point:0
        },
        {
            name:'Player 2',
            point:0
        }
    ];
})
// FUNCTIONS

// CONTROLLERS
gameApp.controller(
    'AppController',
    function($rootScope){
        $rootScope.text = "NUMBER"
    }
);