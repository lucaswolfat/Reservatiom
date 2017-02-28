/**
 * Created by ljwwolfat on 2/6/17.
 */


var ownerView = angular.module("ownerView", ["ngRoute"]);
ownerView.config(function($routeProvider) {
    $routeProvider
        .when("/menu0", {
            templateUrl : "home.html"

        })
        .when("/menu1", {
            templateUrl : "reservation.html"
        })
        .when("/menu2", {
            templateUrl : "seatingarea.html"
        })
        .when("/menu3", {
            templateUrl : "editinformation.html"
        })
        .when("/menu4", {
            templateUrl : "customer.html"
        });
});


ownerView.controller('Controller1',function ($scope,$http) {


    // when landing on the page, get all reservations and show them
    $http.get('/api/reservations')
        .success(function (data) {
            $scope.reservations = data;
            console.log(data);
        })
        .error(function (error) {
            console.log('Error' + error);
        });

    $scope.formDate=function(date){
        var newDate=new Date(date);
        if(newDate.getDate())
        return 'dd.MM.yyyy';
    };

    $scope.orderType = '_id';
    $scope.order = '-';

    $scope.changeOrder = function(type){
        $scope.orderType = type;
        console.log(type);
        if($scope.order===''){
            $scope.order='-';
        }else{
            $scope.order='';
        }
    };



    $scope.findReservation=function (id) {
      $scope.confirmationcode= {code: id};
      console.log($scope.confirmationcode);
        $http.post('/confirmationlogin',$scope.confirmationcode)
            .success(function (data) {
                $scope.confirmationcode={};
                $scope.codeData=data[0];
                $scope.codeData.date=new Date(data[0].date);
                $scope.codeData.time=new Date(data[0].time);
                document.getElementById('id02').style.display='block';
                data={};
            })
            .error(function (error) {
                console.log('Error' + error)
            });
    };

    $scope.editReservation=function () {
        $http.post('/confirmationedit',$scope.codeData)
            .success(function () {
                alert("Update Success")
            })
            .error(function (error) {
                console.log('Error'+error)
            });

        document.getElementById('id02').style.display='none';
        location.reload();

    };

    $scope.deleteReservation=function (id) {
        $http.delete('/confirmationdelete/'+id)
            .success(function () {
            })
            .error(function (error) {
                console.log('Error'+error)
            });
        alert("Delete Success");
        document.getElementById('id02').style.display='none';
        location.reload();



    };
});
ownerView.controller('Controller2',function ($scope,$http) {
    $scope.createReservation = function () {
        $http.post('/api/reservations', $scope.formData)
            .success(function (data) {
                $scope.formData={};
                $scope.reservations = data;
                console.log(data);
                $scope.confirmation =data._id;
                document.getElementById('id01').style.display='none';
                location.reload();
                alert($scope.confirmation);
            })
            .error(function (error) {
                console.log('Error' + error)
            });
    };
});

ownerView.controller('Controller3',function ($scope,$http) {

    $scope.findbyDatetime=function (date,time) {

        $scope.finddata={date: new Date(date),time: new Date(time)};
        console.log($scope.finddata);
         $http.post('/datetimelogin',$scope.finddata)
             .success(function (data) {
                 $scope.finddata={};
                 console.log(data);
                 $scope.seat0={};
                 $scope.seat1={};
                 $scope.seat2={};
                 $scope.seat3={};
                 $scope.seat4={};
                 $scope.seat5={};
                 $scope.seat0=data[0];
                 $scope.seat0.date=new Date(data[0].date);
                 $scope.seat0.time=new Date(data[0].time);
                 console.log($scope.seat0.table);

                 $scope.seat1=data[1];
                 $scope.seat1.date=new Date(data[1].date);
                 $scope.seat1.time=new Date(data[1].time);
                 console.log($scope.seat1.table);

                 $scope.seat2=data[2];
                 $scope.seat2.date=new Date(data[2].date);
                 $scope.seat2.time=new Date(data[2].time);
                 console.log($scope.seat2.table);

                 $scope.seat3=data[3];
                 $scope.seat3.date=new Date(data[3].date);
                 $scope.seat3.time=new Date(data[3].time);
                 console.log($scope.seat3.table);

                 $scope.seat4=data[4];
                 $scope.seat4.date=new Date(data[4].date);
                 $scope.seat4.time=new Date(data[4].time);
                 console.log($scope.seat4.table);

                 $scope.seat5=data[5];
                 $scope.seat5.date=new Date(data[5].date);
                 $scope.seat5.time=new Date(data[5].time);
                 console.log($scope.seat5.table);


             })
    };

    $scope.saveTable=function () {
        $http.post('/confirmationedit',$scope.seat0)
            .success(function () {
            })
            .error(function (error) {
                console.log('Error'+error)
            });
        $http.post('/confirmationedit',$scope.seat1)
            .success(function () {
            })
            .error(function (error) {
                console.log('Error'+error)
            });
        $http.post('/confirmationedit',$scope.seat2)
            .success(function () {
            })
            .error(function (error) {
                console.log('Error'+error)
            });
        $http.post('/confirmationedit',$scope.seat3)
            .success(function () {
            })
            .error(function (error) {
                console.log('Error'+error)
            });
        $http.post('/confirmationedit',$scope.seat4)
            .success(function () {
            })
            .error(function (error) {
                console.log('Error'+error)
            });
        $http.post('/confirmationedit',$scope.seat5)
            .success(function () {
            })
            .error(function (error) {
                console.log('Error'+error)
            });
        location.reload(true);

    }

});

/*
//table choose disable function
var boxes, i, disableOthers;

boxes = document.getElementsByClassName('select');

disableOthers = function () {
    'use strict';
    var i, j, k, selectedValues = [],
        options;

    for (i = 0; i < boxes.length; i += 1) {
        selectedValues.push(boxes[i].value);

        for (j = 0; j < boxes.length; j += 1) {
            if (boxes[j] !== boxes[i]) {
                options = boxes[j].querySelectorAll('option');
                for (k = 0; k < options.length; k += 1) {
                    options[k].disabled = (selectedValues.indexOf(options[k].value) > -1);
                }
            }
        }
    }
};

for (i = 0; i < boxes.length; i += 1) {
    boxes[i].addEventListener('change', function () {
        disableOthers();
    }, false);
}*/
