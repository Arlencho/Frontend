var login = angular.module('login', ['ui.router','ngResource']);

//AngularJS Routing
login.config(function ($stateProvider, $urlRouterProvider){
	var partialsDir = "admin/partials/";	
	$urlRouterProvider.when('','/');	
	$stateProvider.state('/', {
	url: "/",
	templateUrl:partialsDir+'dashboard.html',
	controller: 'defaultCtrl'
	})
	.state('profile', {
	url: "/profile",
	templateUrl:partialsDir+'profile.html',
	controller: 'profileCtrl'
	});
});
