angular
    .module("ContactListApp")
    .controller("ListCtrl", function($scope,$http) {
        
        console.log("Controller initialized");
        
        function refresh(){
            $http.get("/api/v1/contacts").then(function (response){
                $scope.contacts = response.data;
            });
        }
        
$scope.getcon = function (){       

$http.get("/api/v1/contacts/"+$scope.newContact.name).then(function(response) {
  $scope.contacts= response.data;
});
}
        /* $scope.getcontacto = function (){
            
            $http
            
                .get("/api/v1/contacts/Willy" + ' '  )
                .then(function (){
                    refresh();  
                });
        
        }*/
        
        $scope.addContact = function (){
            
            $http
                .post("/api/v1/contacts", $scope.newContact)
                .then(function (){
                    refresh();  
                });
        
        }
        
         $scope.delallContact = function (){
            
            $http
                .delete("/api/v1/contacts", $scope.delallContact)
                .then(function (){
                    refresh();  
                });
        
        }
        
        $scope.delContacto = function (){
            
            $http
                .delete("/api/v1/contacts/" + $scope.newContact.name , $scope.deleteContacto)
                .then(function (){
                    refresh();  
                });
        
        }
        
        $scope.updateContacto = function (){
            
            $http
                .put("/api/v1/contacts/" + $scope.newContact.name , {name:$scope.newContact.name, phone:$scope.newContact.phone})
                .then(function (){
                    refresh();  
                });
        
        }
        
       // refresh();
        
    });
