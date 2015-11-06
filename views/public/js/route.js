var login = angular.module('login', ['ui.router','ngResource', "angular-table"]);

//AngularJS Routing
login.config(function ($stateProvider, $urlRouterProvider){
	var partialsDir = "public/partials/";	
	$urlRouterProvider.when('','/');	
	$stateProvider.state('/', {
	url: "/",
	templateUrl:partialsDir+'dashboard.html',
	controller: 'defaultCtrl'
	})
	.state('register_new', {
	url: "/register_new",
	templateUrl:partialsDir+'register_new.html',
	controller: 'register_newCtrl'
	})
	.state('login', {
	url: "/login",
	templateUrl:partialsDir+'login.html',
	controller: 'loginCtrl'
	});
});
