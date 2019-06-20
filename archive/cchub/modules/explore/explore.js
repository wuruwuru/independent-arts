angular.module('app.explore', ['ui.router', 'app.tester']).config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('explore', {
            abstract: true,
            url: '/explore',
            template: '<div ui-view></div>'
        }).state('explore.home', {
            url: '',
            templateUrl: 'modules/explore/views/home.html',
            controller: 'HomeCtrl'
        }).state('explore.test', {
            url: '/test',
            templateUrl: 'modules/explore/views/test.html',
            controller: 'TestCtrl',
            resolve: {
                isps: ['API', function(API){
                    return API.all('isp/').getList()
                }]
            }
        }).state('explore.question1', {
            url: '/whats-the-internet-like',
            templateUrl: 'modules/explore/views/question1.html',
            controller: 'Question1Ctrl'
        }).state('explore.question2', {
            url: '/what-internet-provider-do-people-use-the-most',
            templateUrl: 'modules/explore/views/question2.html',
            controller: 'Question2Ctrl',
            resolve: {
                url: function(){ return 'isp/popular/' }
            }
        }).state('explore.question3', {
            url: '/whats-is-the-best-internet-provider-value-for-cost',
            templateUrl: 'modules/explore/views/question3.html',
            controller: 'Question2Ctrl',
            resolve: {
                url: function(){ return 'isp/rank/' }
            }
        }).state('explore.question4', {
            url: '/where-are-the-best-places-for-internet',
            templateUrl: 'modules/explore/views/question4.html',
            controller: 'Question2Ctrl',
            resolve: {
                url: function(){ return 'isp/cities/' }
            }
        }).state('explore.question5', {
            url: '/see-the-data-for-your-isp',
            templateUrl: 'modules/explore/views/question5.html',
            controller: 'Question5Ctrl',
            resolve: {
                isps: ['API', function(API){
                    return API.all('isp/').getList()
                }]
            }
        })
    }
]).factory('tips', ['API', function(API){
    return {
        getRandom: function(){
            return API.all('tips/').getList().then(function(data){
                return data[Math.floor(Math.random() * data.length)]
            })
        }
    }
}]).controller('HomeCtrl', ['$scope', '$state',
    function($scope, $state) {
        $scope.goTo = function(state) {
            $scope.selected = true;
            $scope[state] = true;
            setTimeout(function() {
                $state.go('explore.' + state);
            }, 500);
        }
    }
])
.controller('TestCtrl', ['$scope', '$rootScope', '$state', 'Restangular', 'isps', 'device', 'API',
    function($scope, $rootScope, $state, Restangular, isps, device, API) {
        var location, deviceType, selectedIsp;

        $scope.isps = _.clone(isps);
        var isps = _.pluck($scope.isps, 'name');
        $scope.autocompleteOptions = {
            componentRestrictions: { country: 'ng' }
        }

        function mode(arr){
            return arr.sort(function(a,b){
                return arr.filter(function(v){ return v===a }).length
                     - arr.filter(function(v){ return v===b }).length
            }).pop();
        }

        Restangular.oneUrl('ip', 'http://ipinfo.io/json').get().then(function(data){
            var fetchedIsp = data.plain().org.substr(data.plain().org.indexOf(" ") + 1);
            var words = fetchedIsp.toLowerCase().split(" ");
            var matches = [];
            $scope.ready = true;

            _.each(words, function(word){
                var filtered = _.filter(isps, function(isp){ var w = isp.toLowerCase().split(" "); return _.contains(w, word); })
                matches = matches.concat(filtered);
            })

            if (!matches.length){
                $scope.isps.push({name: fetchedIsp, id: fetchedIsp})
                $scope.selectedIsp = fetchedIsp;
            } else if(matches.length == 1){
                $scope.selectedIsp = _.findWhere($scope.isps, {name: matches[0]}).id;
            } else {
                matches = _.find(matches, function(el){ var isp = el.toLowerCase(); return isp.indexOf(words[0]) > -1 });

                if (_.isArray(matches)) {
                    selectedIsp = _.findWhere($scope.isps, {name: mode(matches)})
                } else {
                    selectedIsp = _.findWhere($scope.isps, {name: matches});
                }

                $scope.selectedIsp = selectedIsp.name;
            } 
        });

        if (navigator.geolocation) {
            $scope.locationSearch = true;

            navigator.geolocation.getCurrentPosition(function(position){
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                location = {long: position.coords.latitude, lat: position.coords.longitude}
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        $scope.$apply(function(){
                            $scope.locationSearch = false;
                            $scope.location = results[1].formatted_address;
                        });
                    }
                })
            });
        }

        $scope.reload  = function(){
            $scope.logged = false;
            $scope.speeds = {};
            $scope.reloadTester();
        }

        $scope.post = function(){
            if (_.isObject($scope.location)){
                location = {long: $scope.location.geometry.location.A, lat: $scope.location.geometry.location.F}
            }

            var payload = {
               isp: selectedIsp.id,
               deviceType: device.type,
               location: location.long + ' ,' + location.lat,
               speed: $scope.speeds.downloadVal
            }

            $scope.posting = true;
            var tested = function(valid){
                $scope.message = valid ? "All done! We've logged your Internet speed" : "Thanks! But your results won't show in the calculations cos you're not in Lagos";
                $scope.posting = false;
                $scope.shareMessage = "I just logged my ISP speed (" + $scope.speeds.download + ") to http://internetmeter.ng. Check the performance of other ISPs in Lagos State and add yours!"
                $scope.logged = true;
            }

            API.all('speedlog/').post(payload).then(function(res){
                if(res.status == "fail") {
                    tested(false)
                } else {
                    tested(true);
                }
                $rootScope.$broadcast("logged", "");
            }, function(){
                tested(false);
            })
        }
    }
]).controller('Question1Ctrl', ['$scope', '$state', 'API', '$timeout', 'tips',
    function($scope, $state, API, $timeout, tips) {
        var loc; //Location

        tips.getRandom().then(function(data){
            $scope.tip = data;
        });
        $scope.autocompleteOptions = {
            componentRestrictions: { country: 'ng' }
        }

        $scope.questions = [{
            title: 'Best ISP cost to speed',
            metric: ' (Over 10)',
            max: 10
        }, {
            type: 'fastest',
            title: 'Fastest ISP',
            metric: 'Mbps'
        }, {
            type: 'cheapest',
            title: 'Cheapest ISP',
            metric: ' (₦ per mb)'
        }, {
            type: 'popular',
            title: 'Most Popular ISP',
            metric: ' Logs',
            integer: true
        }];
        $scope.params = {mobile: false, question: $scope.questions[0]}

        function fetchData() {
            var payload = {location: loc}
            if ($scope.params && $scope.params.question.type) {
                payload.type = $scope.params.question.type;
            }

            API.one('isp/location/').get(payload).then(function(data) {
                $scope.data = data.status == "fail" ? [] : data.results;
                $scope.locationLog = data.logStats;
                $scope.loading = false;
                $scope.loaded = true;
            })
        }

        $scope.$watch('place', function(newVal, oldVal) {
            if (_.isObject(newVal) && newVal.geometry) {
                $scope.loading = true;
                $timeout(function() {
                    loc = newVal.geometry.location.A + ',' + newVal.geometry.location.F
                    fetchData();
                }, 1000);
            } else {
                $scope.loading = false;
                $scope.loaded = false;
                $scope.data = null;
            }
        })
        $scope.changeQuery = function(question) {
            $scope.loading = true;
            $scope.loaded = false;
            $scope.data = null;
            $scope.params.question = question;
            fetchData();
        }
    }
]).controller('Question2Ctrl', ['$scope', '$state', 'API', 'url', 'tips',
    function($scope, $state, API, url, tips) {
        $scope.params = {
            mobile: false,
            question: 0
        }
        $scope.loading = true;
        API.all(url).getList().then(function(data) {
            $scope.data = data;
            if(url == 'isp/cities/'){
                $scope.data = _.map($scope.data, function(city){ city.name = city.name.split(',')[0]; return city; })
            }
            $scope.loading = false;
            $scope.loaded = true;
        })
        tips.getRandom().then(function(data){
            $scope.tip = data;
        });
    }
]).controller('Question5Ctrl', ['$scope', '$state', 'API', 'isps', 'tips',
    function($scope, $state, API, isps, tips) {
        $scope.isps = isps;
        var params = {}

        tips.getRandom().then(function(data){
            $scope.tip = data;
        });

        function fetchData() {
            API.one('isp/stats/' + params.isp + '/').get().then(function(data) {
                $scope.selected = _.findWhere(isps, {id: params.isp})
                $scope.isp = data;
                $scope.isp.rank = _.map($scope.isp.rank, function(city){ city.name = city.name.split(',')[0]; return city; })
                $scope.loading = false;
                $scope.loaded = true;
            })
        }

        $scope.changeQuery = function(id) {
            $scope.loading = true;
            $scope.loaded = false;
            $scope.data = null;
            params.isp = id;
            fetchData();
        }
    }
]);