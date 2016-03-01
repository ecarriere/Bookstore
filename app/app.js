var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider

	.when('/', {
		controller: 'BooksController as ctrl',
		templateUrl: 'views/books.html'
	})
	.when('/books', {
		controller: 'BooksController as ctrl',
		templateUrl: 'views/books.html'
	})
	.when('/books/details/:id', {
		controller:'BooksController as ctrl',
		templateUrl: 'views/bookDetails.html'
	})
	.when('/books/add', {
		controller:'BooksController as ctrl',
		templateUrl: 'views/addBook.html'
	})
	.when('/books/edit/:id', {
		controller:'BooksController as ctrl',
		templateUrl: 'views/editBook.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});