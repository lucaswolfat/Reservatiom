/**
 * Created by ljwwolfat on 2/10/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports=mongoose.model('Information',{
    name      : String,
    address   : String,
    telephone : Number,
    emailname : String,
    sundayopen: Date,
    sundayclose: Date,
    mondayopen: Date,
    mondayclose: Date,
    tuesdayopen: Date,
    tuesdayclose: Date,
    wednesdayopen: Date,
    wednesdayclose:Date,
    thursdayopen:Date,
    thursdayclose:Date,
    fridayopen:Date,
    fridayclose:Date,
    saturdayopen:Date,
    saturdayclose:Date
});
