myApp.controller('MakeOfferCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', 'subscribeFactory', 'toaster',   function ($scope, $http, $location, $routeParams, $rootScope, subscribeFactory, toaster) {
        $scope.successMessage;
        $scope.errorMessage;
        var blurbId;
        $scope.yourOffer;
        //to remove this
//        $scope.value;

        $scope.getCurrentBid = function () {
            if ($routeParams.id) {
                blurbId = $routeParams.id;

                $http({
                    method: 'GET',
                    url: '/offer/maxoffer/' + parseInt(blurbId)
                }).
                success(function (data, status, headers, config) {
                    if (status == 200 && data.message == "Current Bid") {
                        //                           alert(data.response.length); 
                        $scope.blurbMakeOffer = data.response;
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
            } else {
                toaster.pop('error', "", "Blurb not found");
            }
        }

        $scope.makeOffer = function (id) {
            if ($rootScope.user) {
                var offerData = {}
                offerData.blurb_Id = id;
                offerData.offerprice = $scope.yourOffer;
                $http({
                    method: 'POST',
                    url: '/offer',
                    data: offerData
                }).
                success(function (data, status, headers, config) {
                    if (status == 200 && data.message == "Offer Created") {
                        toaster.pop('success', "", data.message);
                        //servicecall to subscribe
                        subscribeFactory.insertSubscribe(id)
                            .success(function (data, status, headers, config) {
                                if (status == 200 && data.message == "Subscriber Stored Successfully !!") {
                                    toaster.pop('success', "", data.message);
                                    $location.path("/blurb-detail/" + $routeParams.id);

                                } /*else {
                                    alert(data.message);
                                    $location.path("/blurb-detail/" + $routeParams.id);
                                }*/
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
                        });
                        //                               $routeParams.id = data.response.blurb_Id;
                                                       $location.path("/blurb-detail/" +$routeParams.id);

                    }
                    if(status == 400){
                        toaster.pop('error', "", data.message);                                            
                    }

                }).
                error(function (data, status, headers, config) {
                    if(status == 404){
                        toaster.pop('error', "", data.message);
                      $location.path("/page-not-found");
                    }
                    if(status == 401){
                        toaster.pop('error', "", data.message);                                            
                    }
                    if(status == 500){
                        toaster.pop('error', "", data.message);                                            
                    }
                    if(status == 400){
                        toaster.pop('error', "", data.message);                                            
                    }
//                    alert(data.message);
                });
            } else {
                toaster.pop('error', "", "Please Sign in");
                $location.path("/signin");
            }


        }

}]);