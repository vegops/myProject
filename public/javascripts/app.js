var myApp = angular.module('myApp', []);

myApp.controller('loginController',$scope=>{
    $scope.login = true;
    $scope.switch = function() {
        $scope.login = !$scope.login;
        $('.modal-title').toggleClass('active');
    }
});