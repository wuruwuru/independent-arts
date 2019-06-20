angular.module('ndaniresolutionsApp')

.controller('MainCtrl', ['$scope', 'instagram',
function ($scope, instagram) {
	$scope.videos = [];

	instagram.fetchTag(function(data){
		$scope.videos = data;
	});

}]
)

  .directive("loadFlow", function () {
    return function (scope, element, attrs) {
        scope.$watch("videos", function () {
			$(".player").flowplayer({ splash: true, swf: "/js/player/flowplayer.swf" });
		});
     
    };
});