myApp.controller('EditBlurb1Ctrl', ['$scope', '$http', '$location', '$routeParams', 'toaster', function($scope, $http, $location, $routeParams, toaster) {
        $scope.successMessage;
        $scope.errorMessage;
        $scope.getBlurbsListForUser = function(){
                        
            $http({method: 'GET', url: '/blurb/userBlurb'}).
                success(function(data, status, headers, config) {
                       if(status == 200 && data.message == "Available Blurb"){
//                           alert(data.response.length); 
                           $scope.user_blurb_list = data.response;
                       }else{
                           toaster.pop('info', "", data.message);
                       }

                     }).
                error(function(data, status, headers, config) {
                    if(status == 401){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 400){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 500){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 404){
                        toaster.pop('info', "", data.message);
//                      $location.path("/page-not-found");
                    }
//                   $scope.errorMessage = data.message;
                 }); 
        }
        
        $scope.goToEditBlurb = function(id){
            $routeParams.blurb_id = id;
            $location.path("/edit/" +$routeParams.blurb_id);
        }
    
}]);