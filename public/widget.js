var DemoApp = angular.module('DemoApp', ['dx']);
DemoApp.controller('DemoController', function DemoController($scope,$http) {
     var populationData = [];
    // funciones
     function getAll(){
            $http.get("/api/v1/groups").then(function (response){
                $scope.groups = response.data; 
                
                
                $scope.contador = $scope.groups.length;
                
                //console.log($scope.contador);
                $scope.grupos= [];
               
                for (var i = 0; i < $scope.contador; i++) {
                    console.log($scope.componentes);
                    console.log($scope.groups.componentes);
                    console.log($scope.groups);
                    $scope.grupos[i] = $scope.groups[i].name;
                    populationData[i]={arg:$scope.groups[i].name, val:$scope.groups[i].componentes.length};
                    
                    
                   //populationData.push({arg:'$scope.groups[i].name', val:100});
                    
                    
                    //populationData[i].val = 100;
                   
                }
                console.log(populationData);
                 grafico();
            });
                
        }
        
            
        $scope.seleccionado="";
    
    //End funciones
    
    
    
   
    
    getAll();
   
    
    function grafico() {
    
    $scope.chartOptions = {
        dataSource: populationData,
        legend: {
            visible: false
        
        },
        
        
        series: {
            type: "bar"
        },
        argumentAxis: {
            tickInterval: 10,
            label: {
                format: {
                    type: "decimal"
                }
            }
        },
        title: "Researchers by group"
    };
    };
    
    
    
    
    
});
