myApp.controller('SignInCtrl', ['$scope', '$http', '$rootScope', '$location','$localStorage', 'toaster', function($scope, $http, $rootScope, $location, $localStorage, toaster) {
        $scope.errorMessage;

        $scope.signIn = function(){
            if($scope.signinemail!="" && $scope.signinpasword!=""){
                var signInData = {}
                signInData.email = $scope.signinemail;
                signInData.password= $scope.signinpasword;
                 $http({method: 'POST', url: '/signin', data: signInData}).
                   success(function(data, status, headers, config) {
                         if(status == 200 ){
                           

//                             $localStorage.user = data.response;
                            toaster.pop('success', "", data.message); 
                          $localStorage.user = data.response;
                          $rootScope.user = $localStorage.user;
                             
                          $location.path("/");
                          
                       }
                       if (status == 401) {
                            toaster.pop('error', "", data.message);
                        }

                     }).
                 error(function(data, status, headers, config) {
                   if (status == 500) {
                        toaster.pop('error', "", data.message);
                    }
                     if (status == 401) {
                            toaster.pop('error', "", data.message);
                        }
                     if (status == 400) {
                            toaster.pop('error', "", data.message);
                        }
                    $scope.signinpasword = "";
                 }); 
        }else{
            toaster.pop('error', "", 'Please enter credentials');
//            $scope.errorMessage = "Please enter credentials"
        }



        }

        $scope.getForgotPassword = function(){
            $location.path("/forgot");
        }
        
        $scope.goToSignUp = function(){
            $location.path("/signup");
        }
    
}]);