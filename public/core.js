/**
 * Created by ljwwolfat on 1/31/17.
 */
var reservationSystem=angular.module("reservationSystem",[]);

reservationSystem.controller('Controller4',function ($scope,$http) {
    $http.get('/informationload')
        .success(function (data) {
            $scope.restaurant = data;
        })
        .error(function (error) {
            console.log('Error' + error);
        });

    $scope.usereditReservation=function () {
        $http.post('/editinfomationload',$scope.restaurant)
            .error(function (error) {
                console.log('Error'+error)
            })
    };

});






    reservationSystem.controller('mainController',function ($scope,$http) {


    // when landing on the page, get all reservations and show them
    $http.get('/api/reservations')
        .success(function (data) {
            $scope.reservations = data;
            console.log(data);
        })
        .error(function (error) {
            console.log('Error' + error);
        });

    // when making a reservation store it and show it

    $scope.createReservation = function () {
        $http.post('/api/reservations', $scope.formData)
            .success(function (data) {
                $scope.formData={};
                $scope.reservations = data;
                console.log(data);
                $scope.confirmation =data._id;
                document.getElementById('id02').style.display='none';

                alert($scope.confirmation);
            })
            .error(function (error) {
                console.log('Error' + error)
            });
    };
});
    
    



    reservationSystem.controller('Controller1',function ($scope,$http) {
        $scope.codeData={};
        $scope.findReservation=function () {
            $http.post('/confirmationlogin',$scope.confirmationcode)
                .success(function (data) {
                    $scope.confirmationcode={};
                    $scope.codeData=data[0];
                    $scope.codeData.date=new Date(data[0].date);
                    $scope.codeData.time=new Date(data[0].time);
                    document.getElementById('id04').style.display='none';
                    document.getElementById('id03').style.display='block';
                })
                .error(function (error) {
                    console.log('Error' + error)
                });


        };

        $scope.$watch($scope.codeData,function (newValue,oldValue) {
            if ( newValue !== oldValue ) {
                $scope.codeData = newValue;
            }
        });


        $scope.usereditReservation=function () {
            $http.post('/userconfirmationedit',$scope.codeData)
                .success(
                    alert("Update Success")
                )
                .error(function (error) {
                    console.log('Error'+error)
                })
        };

        $scope.deleteReservation=function (id) {
            $http.delete('/confirmationdelete/'+id)
                .success(function () {
                })
                .error(function (error) {
                    console.log('Error'+error)
                });
            alert("Delete Success");
            document.getElementById('id03').style.display='none';


        };
    });

reservationSystem.controller('Controller2',function ($scope,$http) {


    // when landing on the page, get all reservations and show them
    $http.get('/api/reservations')
        .success(function (data) {
            $scope.reservations = data;
            console.log(data);
        })
        .error(function (error) {
            console.log('Error' + error);
        });


});



/*
reservationSystem.controller('Controller3',function ($scope) {
    $scope.restaurant={
        name: 'Jarvis Restaurant',
        address:'347 Elizabeth Ave #200, Somerset,NJ08873',
        telephone: '(732) 906-7806',
        emailname: 'info@sitacorp.com',
        sundayopen: '11:00AM',
        sundayclose: '11:00PM',

        mondayopen: '11:00AM',
        mondayclose: '11:00PM',

        tuesdayopen: '11:00AM',
        tuesdayclose: '11:00PM',

        thursdayopen: '11:00AM',
        thursdayclose: '11:00PM',

        wednesdayopen: '11:00AM',
        wednesdayclose: '11:00PM',

        fridayopen: '11:00AM',
        fridayclose: '11:00PM',

        saturdayopen: '11:00AM',
        saturdayclose: '11:00PM'
    };
    $scope.new=$scope.restaurant;

    $scope.saveinfo=function () {
        $scope.restaurant=$scope.new;
        document.getElementById('id06').style.display='none';
    };


});
*/





































