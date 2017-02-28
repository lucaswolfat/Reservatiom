

var reservationSystem=require('./models/reservation');
var informationSystem=require('./models/information');
module.exports=function (app) {




// api ----------------------------------------------------------------------------
// get all reservations
    app.get('/api/reservations', function(req, res) {

        // use mongoose to get all reservation in the database
        reservationSystem.find(function(err, reservations) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(reservations); // return all reservations in JSON format
        });
    });


    app.get('/informationload', function(req, res) {

        informationSystem.find(function(err, information) {
            if (err)
                res.send(err);
            res.json(information);
        });
    });


    app.post('/editinfomationload',function (req,res) {
        informationSystem.update(
            { name : req.body.name,
                address  : req.body.address,
                telephone    : req.body.telephone,
                emailname : req.body.emailname,
                sundayopen : req.body.sundayopen,
                sundayclose   : req.body.sundayclose,
                mondayopen : req.body.mondayopen,
                mondayclose   : req.body.mondayclose,
                tuesdayopen : req.body.tuesdayopen,
                tuesdayclose   : req.body.tuesdayclose,
                wednesdayopen : req.body.wednesdayopen,
                wednesdayclose   : req.body.wednesdayclose,
                thursdayopen : req.body.thursdayopen,
                thursdayclose   : req.body.thursdayclose,
                fridayopen : req.body.fridayopen,
                fridayclose   : req.body.fridayclose,
                saturdayopen : req.body.saturdayopen,
                saturdayclose   : req.body.saturdayclose
            }
            ,function (err, information) {
                if (err)
                    res.send(err);
                res.json(information);
            }  )
    });





// create reservation and send back all reservations after creation
    app.post('/api/reservations', function(req, res) {

        // create a reservation, information comes from AJAX request from Angular



        reservationSystem.create({
            firstname : req.body.firstname,
            lastname  : req.body.lastname,
            gender    : req.body.gender,
            telephone : req.body.telephone,
            emailname : req.body.emailname,
            partysize : req.body.partysize,
            date      : req.body.date,
            time      : req.body.time,
            table     : req.body.table
        }, function(err, reservation) {
            if (err)
                res.send(err);

            // get and return all the reservations after you create another
            reservationSystem.find(function(err, reservations) {
                if (err)
                    res.send(err);
                res.json(reservation);
            });
        });

    });

    app.post('/confirmationlogin',function (req,res) {
       reservationSystem.find({_id:req.body.code},function (err,reservation) {
           if (err)
               res.send(err);
           res.json(reservation);
       })
    });

    app.post('/datetimelogin',function (req,res) {
        reservationSystem.find({date:req.body.date,time:req.body.time},function (err,reservation) {
            if (err)
                res.send(err);
            if (reservation)
                res.json(reservation);
        })
    });

    app.post('/confirmationedit',function (req,res) {
            reservationSystem.update(
                {_id:        req.body._id},
                { firstname : req.body.firstname,
                lastname  : req.body.lastname,
                gender    : req.body.gender,
                telephone : req.body.telephone,
                emailname : req.body.emailname,
                partysize : req.body.partysize,
                date      : req.body.date,
                time      : req.body.time,
                    table : req.body.table
                }
          ,function (err, reservation) {
                    if (err)
                        res.send(err);
                    res.json(reservation);
                }  )
        });

    app.post('/userconfirmationedit',function (req,res) {
        reservationSystem.update(
            {_id:        req.body._id},
            { firstname : req.body.firstname,
                lastname  : req.body.lastname,
                gender    : req.body.gender,
                telephone : req.body.telephone,
                emailname : req.body.emailname,
                partysize : req.body.partysize,
                date      : req.body.date,
                time      : req.body.time,
                table : req.body.table
            }
            ,function (err, reservation) {
                if (err)
                    res.send(err);
                res.json(reservation);
            }  )
    });

    app.delete('/confirmationdelete/:codeData_id',function (req,res) {
        reservationSystem.remove({_id:req.params.codeData_id}
        ,function (err) {
            if (err)
                res.send(err);
        })
    });

    //find reservation with id and send back just the information with that id

 /*   app.find('/api/reservations/:reservation_id',function (req,res) {
        reservationSystem.find()
    });*/


    // delete a reservation
 /*   app.delete('/api/reservations/:reservation_id', function(req, res) {
        reservationSystem.remove({
            _id : req.params.reservation_id
        }, function(err, reservation) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            reservationSystem.find(function(err, reservations) {
                if (err)
                    res.send(err);
                res.json(reservations);
            });
        });
    });*/




// application -------------------------------------------

    app.get('*',function (req,res) {    // all other url is *
        res.sendfile('./public/main.html'); // load the single view file
    });



};









