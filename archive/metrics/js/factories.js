inspector

.factory('Store', ['$resource', function($resource) {
    return {
      transactions: $resource('json/transactions.json', {}, {}),
      expenses: $resource('json/expenses.json', {}, {}),
      income: $resource('json/income.json', {}, {})
    }
}])

.factory('LoadTransactions', ['Store', '$q', function(Store, $q) {
  return function() {
  var delay = $q.defer(); 

  Store.transactions.query(function(transactions) {
    delay.resolve(transactions); }, function() {
    delay.reject('Unable to fetch transactions');
  });

  return delay.promise; };
}])

.factory('LoadExpenses', ['Store', '$q', function(Store, $q) {
  return function() {
  var delay = $q.defer(); 

  Store.expenses.query(function(transactions) {
    delay.resolve(transactions); }, function() {
    delay.reject('Unable to fetch expenses');
  });

  return delay.promise; };
}])

.factory('LoadIncome', ['Store', '$q', function(Store, $q) {
  return function() {
  var delay = $q.defer(); 

  Store.income.query(function(transactions) {
    delay.resolve(transactions); }, function() {
    delay.reject('Unable to fetch expenses');
  });

  return delay.promise; };
}]);