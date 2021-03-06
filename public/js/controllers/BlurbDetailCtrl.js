myApp.controller('BlurbDetailCtrl', ['$scope', '$http', '$location', '$rootScope', '$routeParams', 'PubNub', '$localStorage', 'subscribeFactory', 'toaster', function ($scope, $http, $location, $rootScope, $routeParams, PubNub, $localStorage, subscribeFactory, toaster) {
        $scope.successMessage = "";
        $scope.errorMessage = "";
        $scope.offerList = [];
        $scope.isUserSubscribed = false;
        $scope.subscribeId;

        //    $scope.channel = 

        $scope.getDetails = function () {
            if ($routeParams.id) {
                var blurbId = $routeParams.id;
                $http({
                    method: 'GET',
                    url: '/blurb/detail/' + parseInt(blurbId)
                }).
                success(function (data, status, headers, config) {
                    if (status == 200 && data.message == "Available Blurb") {
                        //                           alert(data.response.length); 
                        $scope.blurb = data.response;
                    } /*else {
                        $scope.errorMessage = data.message;
                    }*/

                }).
                error(function (data, status, headers, config) {
                    if(status == 404){
                        toaster.pop('error', "", data.message);
                        $location.path("/page-not-found");
                    }
                    if(status == 400){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 500){
                        toaster.pop('error', "", data.message);
                    }
//                    $scope.errorMessage = data.message;
                });


                $http({
                    method: 'GET',
                    url: '/blurb/offer/' + parseInt(blurbId)
                }).
                success(function (data, status, headers, config) {
                    if (status == 200 && data.message == "Offer Available On Blurbs") {
//                        if (data.response.length >= 0) {
                            toaster.pop('info', "", data.message);
                            $scope.offerList = data.response;
                        /*} else {
                            $scope.errorMessage = data.message;
                        }*/
                    } else {
                        toaster.pop('info', "", data.message);
                    }

                }).
                error(function (data, status, headers, config) {
//                    $scope.errorMessage = data.message;
                    if(status == 400){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 500){
                        toaster.pop('error', "", data.message);
                    }
                });

                $http({
                    method: 'GET',
                    url: '/checkSubscription/' + $routeParams.id
                }).
                success(function (data, status, headers, config) {
                    if (status == 200 && data.message == "Subscriber exists") {
                        //                    $scope.successMessage = data.message;
                        $scope.isUserSubscribed = true;
                        PubNub.ngSubscribe({
                            channel: "blurbid:" + $routeParams.id
                        })
                        $scope.subscribeId = data.response.id;
                        //                    $localStorage.subscribedUser = data.response;
                        //                    $rootScope.subscribedUser = $localStorage.subscribedUser;
                    } else {
                            toaster.pop('info', "", data.message);
                    }
                }).
                error(function (data, status, headers, config) {
                    if(status == 401){
                        toaster.pop('error', "", data.message);
                }
                    if (status == 400) {
                        toaster.pop('error', "", data.message);
                    }
                    if (status == 500) {
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 404){
//                        $scope.errorMessage = data.message;
//                        $location.path("/page-not-found");
                    }
                });


            } else {
                toaster.pop('error', "", "Blurb not found");
            }
        }

        if (!$rootScope.initialized) {
            // Initialize the PubNub service
            PubNub.init({
                //                publish_key:'your pub key',
                subscribe_key: 'demo',
                //                uuid:'an_optional_user_uuid'
            });
            $rootScope.initialized = true;
        }

        /* PubNub.ngSubscribe({ channel: "blurbid:1" })
            
            $rootScope.$on(PubNub.ngMsgEv("blurbid:1"), function(event, payload) {
                $scope.$apply(function() {
                    console.log('got a message event:', payload);
                    $scope.offerList.push(payload.message);
                });
            });*/

        $scope.placeBid = function (id) {
            if ($rootScope.user) {
                $routeParams.id = id;
                $location.path("/makeoffer/" + $routeParams.id);
            } else {
                $location.path("/signin");
            }
        }

        $scope.subscribe = function (id) {
            if ($rootScope.user) {
                //            var subscribeData = {}
                //            subscribeData.blurb_Id = id;
                //            $routeParams.id = id;
                //            $http({method: 'POST', url: '/subscribe', data: subscribeData}).

                subscribeFactory.insertSubscribe(id)
                    .success(function (data, status, headers, config) {
                        if (status == 200 && data.message == "Subscriber Stored Successfully !!") {
//                            $scope.errorMessage = "";
                              toaster.pop('success', "", data.message);
                            $scope.isUserSubscribed = true;
                            $scope.subscribeId = data.response.id;
                            //                    $localStorage.subscribedUser = data.response;
                            //                    $rootScope.subscribedUser = $localStorage.subscribedUser;    
                            PubNub.ngSubscribe({
                                channel: "blurbid:" + id
                            })
                        } else {
                            toaster.pop('info', "", data.message);
                        }
                    }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        toaster.pop('error', "", data.message);
                    }
                    if (status == 400) {
                        toaster.pop('error', "", data.message);
                    }
                    if (status == 500) {
                        toaster.pop('error', "", data.message);
                    }
//                    $scope.errorMessage = data.message;
                });

            } else {
                $location.path("/signin");
            }
        }

        //    $rootScope.subscribedUser || $localStorage.subscribedUser
        if ($scope.isUserSubscribed) {
            PubNub.ngSubscribe({
                channel: "blurbid:" + $routeParams.id
            })
        }

        $rootScope.$on(PubNub.ngMsgEv("blurbid:" + $routeParams.id), function (event, payload) {
            $scope.$apply(function () {
                //                    console.log('got a message event:', payload);
                //                    $rootScope.subscribedUser || $localStorage.subscribedUser
                if ($scope.isUserSubscribed) {
                    $scope.offerList.push(payload.message);
                }
            });
        });


        //    make subscribe as service
        /*$rootScope.$on('subscribeBroadcast', function(event, args) {
        console.log(args.blurbId);
        alert(args.blurbId);
    });  */

        $scope.unSubscribe = function (blurbId) {


            //        if($rootScope.subscribedUser){

            $http({
                method: 'DELETE',
                url: '/unsubscribe/' + parseInt($scope.subscribeId)
            }).
            success(function (data, status, headers, config) {
                if (status == 200 && data.message == "Unsubscribed Successfully") {
                    $scope.isUserSubscribed = false;
                    toaster.pop('success', "", data.message);
                    //                    $localStorage.subscribedUser = null;
                    //                    $rootScope.subscribedUser = null;    
                    //unsubscribe from pubnub
                    PubNub.ngUnsubscribe({
                        channel: "blurbid:" + blurbId
                    })
//                    $scope.errorMessage = "";
                    //                    $scope.successMessage = data.message;
                } else {
                    toaster.pop('warning', "", data.message);
                }
            }).
            error(function (data, status, headers, config) {
                if (status == 400) {
                    toaster.pop('error', "", data.message);
                }
                if (status == 500) {
                    toaster.pop('error', "", data.message);
                }
                
                //                $scope.errorMessage = data.message;
            });

            //     }else{
            //            alert("OOps!!, You were not subscribed to this blurb");
            //            $location.path("/blurb-detail/" +blurbId);
            //        }
        }

}]);