/**
 * Created by ljwwolfat on 1/30/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports=mongoose.model('Reservation',{
    firstname: String,
    lastname:  String,
    gender:    String,
    emailname:     String,
    telephone: Number,
    partysize: Number,
    date:      Date,
    time:      Date,
    table:     Number
});


