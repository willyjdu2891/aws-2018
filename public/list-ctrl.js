angular
    .module("GroupListApp")
    .controller("ListCtrl", function($scope,$http) {
        
        console.log("Controller initialized");
        
        //array para los profesores
         $scope.refreshOne = function (){
            $http.get("/api/v1/groups/" + $scope.groups.id) .then(function (response){ 
                //+ $scope.newGroup.id
                //$scope._ID)
                //$scope.componentes=$scope.newGroup.componentes;
              // $scope.lines=$scope.newGroup.lineresearch;
                $scope.groups = response.data[0];
               
            });
        }
        
        
         $scope.Item_id = function(id){
            $scope._ID = id;
            $scope.groups.id=id
            console.log(id);
            
        }
        
        $scope.profesores = ['Manuel Resinas | Tel: 589 63 52 41 | Email:manuel.resinas@gmail.com','Maria Escalona | Tel: 365 85 74 12 | Email:maria.escalona@gmail.com',
        'Jose Miguel | Tel: 369 52 41 58 | Email:jose.miguel@gmail.com','Manuel Risoto | Tel: 666 66 36 58 | Email:manuel.risoto@gmail.com','Ana Ramirez | Tel: 698 99 66 45 | Email:ana.ramirez@gmail.com', 
        'David Feliz |Tel: 589 69 58 41 | Email:david@gmail.com']
            
        $scope.seleccionado="";
        
        //agregar profesores al textarea
        $scope.componentes=[];
        $scope.addProfesor = function(){
            $scope.componentes += $scope.new.select+"\n";
        }
        
        
        //agregar lineas de investigacion al textarea addLines
        $scope.lines=[];
        $scope.addLines = function(){
            $scope.lines += $scope.new.lines+"\n";
        }
        
        
        function refresh(){
            $http.get("/api/v1/groups").then(function (response){
                $scope.groups = response.data; 
                
            });
        }
        
        
        
        $scope.addGroup = function (){
            //console.log($scope.newGroup.id)
            //$scope.newGroup.id=$scope._ID;
            //console.log($scope.newGroup.id)
           // $scope.groups.componentes=$scope.componentes;
          // $scope.groups.lineresearch=$scope.lines;
           $scope.newGroup={name:$scope.groups.name, id:$scope.groups.id, responsable:$scope.groups.responsable, email:$scope.groups.email};
           
            $http
                .post("/api/v1/groups", $scope.newGroup)
                .then(function (){
                    console.log($scope.newGroup)
                    console.log($scope.groups[5])
                    if(require.status==200)
                        alert("The " +$scope.groups.name+" group was successfully updated")
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Group with Id "+$scope.groups.id+" no found")
                    
                     // $scope.limpiar(); 
                    
                });
                refresh(); 
        }
        
        
        $scope.limpiar= function(){
            $scope.newGroup.id=null;
            $scope.newGroup.name=null;                
            $scope.newGroup.responsable=null;                
            $scope.newGroup.email=null;                
            $scope.componentes=null;                
            $scope.lines=null; 
            
        }
        
        
        $scope.delGroupAll = function (){
            
            $http
                .delete("/api/v1/groups", $scope.delGroupAll)
                .then(function (){
                    refresh();  
                });
        
        }
        
    /*    $scope.delGroup = function (){
            
            $http
                .delete("/api/v1/groups/"+ $scope.newGroup.id)
                .then(function (){
                    refresh();  
                });
        
        } */
        
         $scope.deleteGroup = function (){
            $http
                .delete("/api/v1/groups/"+ $scope.groups.id)
                .then(function (require){
                    
                    if(require.status==200)
                        alert("The " +$scope.groups.name+" group was successfully deleted")
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Group with Id "+$scope.groups.id+" no found")
                    
                });
                refresh();
        }
        
        $scope.UpdateGroup = function (){
            
            $http
                .put("/api/v1/groups/"+ $scope.groups.id, $scope.groups) 
                .then(function (){
                    //refresh();
                    if(require.status==200)
                        alert("The " +$scope.groups.name+" group was successfully updated")
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Group with Id "+$scope.groups.id+" no found")
                    
                    
                });
            $scope.limpiar();
        }
        
        
       refresh();
        
    });