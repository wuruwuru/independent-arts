inspector

.controller('PagesController', function ($rootScope, $scope, $routeParams, $route, $location) {
	var current;

    //If you want to use URL attributes before the website is loaded
    $rootScope.$on('$routeChangeSuccess', function () {
		$scope.current = $location.path();
    });
})

.controller('TransactionController', ['$scope', 'transactions', 
  function($scope, transactions) {
    $scope.transactions = transactions;
}])

.controller('ExpensesController', ['$scope', 'expenses', 
  function($scope, expenses) {    
    $scope.expenses = expenses[0].data;
    $scope.stats = expenses[0].stats;
}])

.controller('IncomeController', ['$scope', 'income', 
  function($scope, income) {
    $scope.income = income[0].data;
    $scope.stats = income[0].stats;
}]);