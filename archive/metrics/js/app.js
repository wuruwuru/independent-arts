var inspector = angular.module('inspectorApp', ['ngRoute','ngResource', 'countTo']);
  
inspector.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/transactions', {
      templateUrl: 'views/transactions.html',
      controller: 'TransactionController',
      resolve: {
        transactions: function(LoadTransactions) { 
          return LoadTransactions(); 
        }
      }
    }).
    when('/expenses', {
      templateUrl: 'views/expenses.html',
      controller: 'ExpensesController',
      resolve: {
        expenses: function(LoadExpenses) { 
          return LoadExpenses(); 
        }
      }
    }).
    when('/income', {
      templateUrl: 'views/income.html',
      controller: 'IncomeController',
      resolve: {
        income: function(LoadIncome) { 
          return LoadIncome(); 
        }
      }
    }).
    otherwise({
      redirectTo: '/transactions'
    });

}]);