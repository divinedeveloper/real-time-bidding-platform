myApp.controller('CreateCompanyCtrl', ['$scope', '$http', '$location', '$upload', '$rootScope', 'toaster', function($scope, $http, $location, $upload, $rootScope, toaster) {
        $scope.errorMessage;
    $scope.imageuploaded = "";
    
    //check if usercompay exists
    $scope.checkMerchantExists = function(){
        $http({method: 'GET', url: '/user'}).
                success(function(data, status, headers, config) {
                    if(status == 200 && data.message == "Available Users"){
//                           alert(data.response.length); 
                           var userObj = data.response;
                           $scope.companyName = userObj.companyname;
                           $scope.companyPhone = parseInt(userObj.phone);
                           $scope.companyDescription = userObj.companydes;
                           $scope.companyLogo = userObj.oglogo;
                    }
                    if(status == 404){
                        toaster.pop('info', "", "Please create a company");
                    }
                    

                }).
                error(function(data, status, headers, config) {
                   if(status == 401){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 500){
                      toaster.pop('error', "", data.message);
                    }
                    if(status == 404){
                        toaster.pop('error', "", data.message);
//                        $location.path("/page-not-found");
                    }
            });
    
    }
    

        $scope.createCompany = function(){
            if($scope.companyName!="" && $scope.companyDescription!=""){
                var createCompanyData = {}
//                createCompanyData.username = $scope.username;
                createCompanyData.companyname = $scope.companyName;
                createCompanyData.phone = $scope.companyPhone;
                createCompanyData.description = $scope.companyDescription;
                $http({method: 'PUT', url: '/user', data: createCompanyData}).
                   success(function(data, status, headers, config) {
                    if(status == 200 && data.message == "Updated successfully"){
                           toaster.pop('success', "", data.message);
                        //save uploaded image to server
                        if ($scope.imageuploaded) {
                            $scope.upload = $upload.upload({
                            url: $rootScope.baseurl + '/userimageupload/'+ data.response.id , //upload.php script, node.js route, or servlet url
//                            method: 'POST',
                            // headers: {'header-key': 'header-value'},
                            // withCredentials: true,
                            data: {
                                myObj: "image"
                            },
                            file: $scope.imageuploaded, // or list of files: $files for html5 only
                            /* set the file formData name ('Content-Desposition'). Default is 'file' */
                            //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                            /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                            //formDataAppender: function(formData, key, val){}
                        }).progress(function (evt) {
                            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                        }).success(function (data, status, headers, config) {
                            // file is uploaded successfully
                            console.log(data.message);
                            if(status == 200){
                               toaster.pop('success', "", data.message);
                            }
                        }).error(function (data, status, headers, config) {
                            // file not uploaded successfully
                           console.log(data);
                            if(status == 500){
                               toaster.pop('error', "", data.message);
                            }
                            
                            if(status == 400){
                               toaster.pop('error', "", data.message);
                            }
                            if(status == 404){
                                toaster.pop('error', "", data.message);
                               $location.path("/page-not-found");
                            }
                        });

                    }
                        //change redirect to blurbs created by user
                        $location.path("/admin-blurbs");

                   }
                       
                       
                     }).
                 error(function(data, status, headers, config) {
                       if(status == 500){
                           toaster.pop('error', "", data.message);
                       }
                       if(status == 401){
                           toaster.pop('error', "", data.message);
                       }
                       if(status == 403){
                           toaster.pop('error', "", data.message);
                       }
                     if(status == 400){
                           toaster.pop('error', "", data.message);
                       }
                 }); 
            }else{
            toaster.pop('error', "", "Please enter Company name and description");
            }
        }
        
        //file upload starts
        $scope.onImageSelect = function ($files) {
            
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                
                if(file.type.indexOf('image') === -1){
                    toaster.pop('error', "", 'only images are allowed');
                    
                    continue;
                    
                }else{
                    $scope.imageuploaded = file
                }
                
                

                //.error(...)
                //.then(success, error, progress); 
                //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
            }
        }
        
        /*$scope.image;
        $scope.single = function(image){
            alert(image);
        }*/

}]);