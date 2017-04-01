myApp.controller('SignUpCtrl', ['$scope', '$http', '$location', 'toaster', function($scope, $http, $location, toaster) {
        $scope.errorMessage;
        $scope.signUp = function(){
                        
            if($scope.signupname!="" && $scope.signupemail!="" && $scope.signuppassword!=""){
                var signUpData = {}
                signUpData.name = $scope.signupname;
                signUpData.email = $scope.signupemail;
                signUpData.password= $scope.signuppassword;
                
                //check email already exists or not
                
                var emailJson = {}
                emailJson.email = signUpData.email;
                //to do this stuff with promise
                $http({method: 'POST', url: '/checkemail', data: emailJson}).
                   success(function(data, status, headers, config) {
                       if(status == 200 && data.message=="E-Mail Already Exists" && data.response == signUpData.email ){
                           toaster.pop('error', "", data.message);
                       }else{
                           $http({method: 'POST', url: '/signup', data: signUpData}).
                            success(function(data, status, headers, config) {
                               if(status == 200 ){
                                   toaster.pop('success', "", data.message);
                                    $location.path("/signin");
                                }
                                
                            }).
                             error(function(data, status, headers, config) {
                                 if(status == 500 ){
                                    toaster.pop('error', "", data.message);
                                }
                               
                             });
                       }

                     }).
                 error(function(data, status, headers, config) {
                   toaster.pop('error', "", data.message);
                 }); 
                
         }else{
            toaster.pop('error', "", "Please fillup all fields");
        }
    }
        
       

        $scope.goToSignIn = function(){
            $location.path("/signin");
        }
    
}]);