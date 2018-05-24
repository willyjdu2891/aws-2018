angular
    .module("GroupListApp")
    
    .controller("ListCtrl", function($scope,$http) {
        
        console.log("Controller initialized");
        
        $scope.Item_id = function(id){
            $scope.id = id;
           // $scope.groups.id=id;
          // $scope.id= $scope.groups.id;
            console.log(id);
            console.log($scope.id);
           
            
             }
             
             
        $scope.active=function(){
            if( $scope.groups.name== null  || $scope.groups.responsable==null || $scope.groups.email==null) {
            $scope.start1=true;
            console.log( $scope.start1)
        }
        else{
                        $scope.start1=false;
                        console.log( $scope.start1)

        }
        }  
        
        //array para los profesores
        
            $scope.getresearchers= function(require){
            $http.get("/api/v1/researchers").then(function (response){
                if(response.status==200)
                       $scope.researchers = response.data; 
                $scope.contador=$scope.researchers.length;
                $scope.profesores=[];
                 for( var i=0; i < $scope.contador; i++){
                     $scope.profesores[i]= $scope.researchers[i].name;
                     
                    $scope.profesores[i] += ' | Phone '+ $scope.researchers[i].phone;
                    $scope.profesores[i] += ' | E-mail '+ $scope.researchers[i].mail;
                 } 
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Investigator list will not be  available");
                    
              
            });
                
        }
        
        
        
        
        $scope.getprojects= function(require){
            $http.get("/api/v1/projects").then(function (response){
                if(response.status==200)
                       $scope.projects = response.data; 
                       console.log( $scope.projects);
                $scope.contador=$scope.projects.length;
                $scope.proyectos1=[];
                 for( var i=0; i < $scope.contador; i++){
                     $scope.proyectos1[i]= $scope.projects[i].projname;
    
                    
                 } 
                 console.log($scope.proyectos1);
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Projects list will not be  available");
                    
              
            });
                
        }
        
        $scope.getuniversities= function(require){
            $http.get("/api/v1/universities").then(function (response){
                if(response.status==200)
                       $scope.universities = response.data; 
                      
                $scope.contador=$scope.universities.length;
                $scope.universidad1=[];
                 for( var i=0; i < $scope.contador; i++){
                     $scope.universidad1[i]= $scope.universities[i].name;
    
                    
                 } 
                 console.log($scope.universidad1);
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Universities list will not be  available");
                    
              
            });
                
        }
        //2487-9632-2588-8574
        
        //$scope.profesores= $scope.researchers JSON.parse(;
        
        $scope.profesores2 = ['Manuel Resinas | Tel: 589 63 52 41 | Email:manuel.resinas@gmail.com','Maria Escalona | Tel: 365 85 74 12 | Email:maria.escalona@gmail.com',
        'Jose Miguel | Tel: 369 52 41 58 | Email:jose.miguel@gmail.com','Manuel Risoto | Tel: 666 66 36 58 | Email:manuel.risoto@gmail.com','Ana Ramirez | Tel: 698 99 66 45 | Email:ana.ramirez@gmail.com', 
        'David Feliz |Tel: 589 69 58 41 | Email:david@gmail.com']
            
        $scope.seleccionado="";
        
        //agregar profesores al textarea
       var componentes=[];
$scope.componentes1=[];
        $scope.addProfesor = function(){
            
            
            //$scope.x =0 ;
            //console.log($scope.x);
            //
           $scope.componentes1 += $scope.new.select+"\n";
           
             componentes.push({name:$scope.new.select});
              $scope.componentes=componentes;          
            console.log(componentes);
            console.log($scope.componentes);
           // $scope.componentes2[$scope.x]=$scope.new.select;
            
           // $scope.componentes2 =$scope.componentes2.push($scope.componentes);
            
            $scope.new.select="";
           
            
            }
        
        
        //agregar lineas de investigacion al textarea addLines
        $scope.lines=[];

        $scope.addLines = function(){
            $scope.lines += $scope.new.lines+"\n";
            $scope.new.lines="";
        }
        
        
        $scope.generarID = function(){
            //$scope.limpiar();
            //$scope.groups=[];
            $http.get("/api/v1/groups").then(function (response){
                $scope.contador= response.data;
                var c=0;
                for (var i = 0; i < $scope.contador.length; i++) {
                    c++;
                }
                
                c++;
                $scope.id= c.toString();
                
                
                
                
            });
        } 
        
        
    
        
        function refresh(){
            $http.get("/api/v1/groups").then(function (response){
                $scope.groups = response.data; 
                
               // if ($scope.groups.length==null) {
                //    $scope.groups = "No any groups" ;
               // }
                
            });
                
        }
        
         $scope.refreshOne = function (){
            $http.get("/api/v1/groups/"+ $scope.id)
            .then(function (response){
                $scope.groups = response.data[0];
                $scope.componentes1=$scope.groups.componentes1;
                $scope.lines=$scope.groups.lineresearch;
                
                if(require.status==200)
                        {alert("Group with Id "+$scope.id+" found") }
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Group with Id "+$scope.id+" no found")
                        
                });
        }
        
       $scope.addGroup = function (){
            //$scope.newGroup= $scope.groups;
            //$scope.newGroup.id= $scope.id;
           // $scope.id=$scope.newGroup.id;
            console.log($scope.newGroup)
               //$scope.newGroup.id= $scope.generarID();
          // $scope.newGroup.componentes=$scope.componentes;
           //$scope.newGroup.lineresearch=$scope.lines;
           $scope.newGroup={name:$scope.groups.name, id:$scope.id, responsable:$scope.groups.responsable, email:$scope.groups.email, componentes:$scope.componentes, componentes1:$scope.componentes1, lineresearch:$scope.lines, university:$scope.groups.universidad};
           console.log($scope.groups)
            $http
                .post("/api/v1/groups", $scope.newGroup)
                .then(function (require){
                   // refresh();
                    if(require.status==201)
                        alert("The " +$scope.newGroup.name+" group was successfully created");
                         $scope.limpiar(); 
                         refresh(); 
                })
                .catch (function(rejection){
                    if(rejection.status == 503)
                        alert("Service not available");
                
                });
                refresh(); 
                //$scope.limpiar();
                
                
        }
        
        $scope.limpiar= function(){
            $scope.id=null;
            $scope.groups.id=null;                
            $scope.groups.name=null;                
            $scope.groups.responsable=null;                
            $scope.groups.email=null;                
            $scope.componentes=" ";                
            $scope.lines=" "; 
            $scope.componentes1=" ";
            
        }
        
        
       $scope.delAllGroup = function (ev){
         /* //  $mdDialog.show(
              //  $mdDialog.alert()
                //.parent(angular.element(documento.querySelector('#poputContainer')))
                .clickOutsideToClose(true)
                .title('Thi is an alert title')
                .textContent('You can specific')
                .arialLabel('Alert Dialog Demo')
                .ok('Got it')
                .targetEvent(ev)
                )
            
            */
            $http
                .delete("/api/v1/groups", $scope.delAllGroup)
                .then(function (){
                    if(require.status==201)
                        alert("All the  groups were successfully deleted");
                         $scope.limpiar(); 
                         refresh(); 
                })
                .catch (function(rejection){
                    if(rejection.status == 503)
                        alert("Groups couldn't be deleted, Service not available");
                    refresh();  
                }); 
        
        } 
        
        $scope.deleteGroup = function (){
            $http
                .delete("/api/v1/groups/"+ $scope.groups.id)
                .then(function (require){
                    refresh();
                    if(require.status==200)
                        alert("The " +$scope.groups.name+" group was successfully deleted")
                        refresh()
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Group with Id "+$scope.groups.id+" no found")
                    
                });
        
        }
        
        $scope.UpdateGroup = function (){
            $scope.groups.componentes=$scope.componentes;
            $scope.groups.lineresearch=$scope.lines;
            
            $http
                .put("/api/v1/groups/"+ $scope.groups.id, $scope.groups) 
                .then(function (){
                    refresh();
                    $scope.limpiar();
                if(require.status==201)
                        alert("The " +$scope.newGroup.name+" group was successfully updated");
                         $scope.limpiar(); 
                         refresh(); 
                })
                .catch (function(rejection){
                    if(rejection.status == 503)
                        alert("Service not available");
                    
                    
                    
                    
                    
                });
        
        }
        $scope.getuniversities();
         $scope.getprojects();
        $scope.getresearchers();
        refresh();
        
        
        
    });
    
  
