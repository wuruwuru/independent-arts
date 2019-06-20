inspector

.directive('chart', function() {
   return {
      restrict: 'E',
      scope: {
        values: '=values'
      },
      link: function(scope, elem, attrs) {
        var highest = 0;
        var bars = [];

        _.each(scope.values, function(element, index, list){
          var bar = _.pick(element, 'time', 'total');
          bars.push(bar);
        })

        //Get Average
        _.each(bars, function(element, index, list){
            if (element.total > highest) {
              highest = element.total;
            }
        })

        //Assign width value
        _.each(bars, function(element, index, list){
          element.width = (element.total / highest) * 100;
        })

        scope.bars = bars;
      },
      templateUrl: 'views/chart.html'
   }
})