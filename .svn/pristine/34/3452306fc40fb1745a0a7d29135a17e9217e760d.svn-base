myApp.controller('ForgotPasswordCtrl', ['$scope', '$http', '$location', 'toaster', function($scope, $http, $location, toaster) {
        $scope.errorMessage;

        $scope.forgotPassword = function(){
            if($scope.forgotpasswordemail!=""){
                var forgotPasswordData = {}
                forgotPasswordData.email = $scope.forgotpasswordemail;
                $http({method: 'POST', url: '/forgot', data: forgotPasswordData}).
                   success(function(data, status, headers, config) {
                    if(status == 200){
                           toaster.pop('success', "", data);
                           $location.path("/signin");
                       }
                       
                       
                     }).
                 error(function(data, status, headers, config) {
                     if(status == 500){
                           toaster.pop('error', "", data.message);
                       }
                       if(status == 401){
                           toaster.pop('error', "", data.message);
                       }
//                   $scope.errorMessage = data.message;
                 }); 
            }else{
            toaster.pop('error', "", "Please enter email");
            }
        }

       /*       
        $scope.goToSignUp = function(){
            $location.path("/signup");
        }*/
    
}]);