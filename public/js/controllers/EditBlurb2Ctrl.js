myApp.controller('EditBlurb2Ctrl', ['$scope', '$http', '$location', '$routeParams', '$upload', '$rootScope','toaster', function($scope, $http, $location, $routeParams, $upload, $rootScope, toaster) {
        $scope.successMessage;
        $scope.errorMessage;
    $scope.fileuploadedonupdate = "";
//        alert($routeParams.blurb_id);
    
    $scope.getBlurbDetails = function(){
        if($routeParams.blurb_id){
            var blurbId = $routeParams.blurb_id;
            $http({method: 'GET', url: '/blurbs/' + parseInt(blurbId)}).
                success(function(data, status, headers, config) {
                       if(status == 200 && data.message == "Available Blurb"){
    //                          alert(data.response.length); 
                           $scope.blurb = data.response;
                       }
                    //remove it later as it is in error function
                    if(status == 404){
                        toaster.pop('error', "", data.message);
                      $location.path("/page-not-found");
                    }
                }).
                error(function(data, status, headers, config) {
                    if(status == 400){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 401){
                        toaster.pop('error', "", data.message);
                        $location.path("/");
                    }
                    if(status == 500){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 404){
                        toaster.pop('error', "", data.message);
                      $location.path("/page-not-found");
                    }
                  
                 }); 
            }else{
                toaster.pop('error', "", "Blurb not found");
            }
    }
        
        /*$scope.goToEditBlurb = function(id){
            $routeParams.blurb_id = id;
            $location.path("/edit/" +$routeParams.blurb_id);
        }*/
    
    //file upload starts
        $scope.onUpdateFileSelect = function ($files) {
            
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                var ext = file.name.split('.').pop();
                if(ext=="pdf" && file.type=="application/pdf"){
                    $scope.fileuploadedonupdate = file
                }else{
                    toaster.pop('error', "", "Please upload only pdf files.");
                    angular.forEach(
                        angular.element("input[type='file']"),
                        function(inputElem) {
                          angular.element(inputElem).val(null);
                    });
                }

                
            }
        }
        
        $scope.updateBlurb = function(blurb){
            
            //check if file is uploaded
            if($scope.fileuploadedonupdate){
                $scope.upload = $upload.upload({
                            url: $rootScope.baseurl + '/blurbfileupload/'+ blurb.id , //upload.php script, node.js route, or servlet url
//                            method: 'POST',
                            // headers: {'header-key': 'header-value'},
                            // withCredentials: true,
                            data: {
                                myObj: "file"
                            },
                            file: $scope.fileuploadedonupdate, // or list of files: $files for html5 only
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
                            if(status == 403){
                                toaster.pop('error', "", data.message);
                            }
                            if(status == 404){
                                toaster.pop('error', "", data.message);
                               $location.path("/page-not-found");
                            }
                        
                        });
                
            }
            
            if(blurb!=null){
                if(blurb.title!=null && blurb.title!=""){
                    $http({method: 'PUT', url: '/blurb/' + parseInt($routeParams.blurb_id), data: blurb}).
                        success(function(data, status, headers, config) {
                           if(status == 200 && data.message == "Updated successfully"){
        //                          alert(data.response.length); 
                               toaster.pop('success', "", data.message);
                              
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
                            /*if(status == 403){
                               $scope.errorMessage = data.message;
                            }*/
                            if(status == 400){
                               toaster.pop('error', "", data.message);
                            }
                            if(status == 404){
                                toaster.pop('error', "", data.message);
                               $location.path("/page-not-found");
                            }
                           
                         }); 
                }else{
                    toaster.pop('warning', "", "Please fillup Required fields");
                }
                
            }else{
                toaster.pop('error', "", "Blurb not found");
            }
            
        }
        
        $scope.deleteBlurb = function(){
            if($routeParams.blurb_id){
//            var blurbId = $routeParams.blurb_id;
            $http({method: 'DELETE', url: '/blurb/' + parseInt($routeParams.blurb_id)}).
                success(function(data, status, headers, config) {
                       if(status == 200 && data.message == "Blurb Deleted..."){
    //                          alert(data.response.length); 
//                           $scope.blurb = data.response;
                           toaster.pop('success', "", data.message);
                           $location.path("/admin-blurbs");
                       }
                }).
                error(function(data, status, headers, config) {
//                   $scope.errorMessage = data.message;
                   if(status == 500){
                        toaster.pop('error', "", data.message);
                    }
                    if(status == 401){
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
            }else{
                toaster.pop('error', "", "Blurb not found");
            }
        }
}]);