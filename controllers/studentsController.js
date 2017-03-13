// Student Controller 
var passportStudent = require("../config/passportStudent");
var passportTeacher = require("../config/passportTeacher");
var isAuthenticated = require("../config/middleware/isAuthenticated");


var db = require("../models");
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
// var connection = require('../config/connection.js')

// Student's home view 
// Get announcements from student's teacher(s) and project(s) student is working on 

router.get('/view/:studentid', function(req,res){
	db.Student.findAll({ 
    where: {
      id: req.params.studentid,
    },
    include: [db.StudentToProject]
  }).then(function(result) {
      var student_objs = result; 

      // Get the ids of each of the projects the student is working on 
      var projIds = []
      for (i in student_objs){          
        projIds.push(student_objs[i].dataValues.StudentToProject.dataValues.ProjectId)
      }

      console.log("projIds" + projIds)
      // Grab data in Educator and Fieldnote tables corresponding to the projects the student is working on 
      db.Project.findAll({ 
        where: {
          ProjectId: projIds,
        },
        include: [db.Educator]

      }).then(function(result) {

        // var project_objs = result; 

        // var project_info = []
        // for (i in projIds){

        //   var p_i = {
        //     "name": project_objs[0].dataValues.name,
        //     "current_announcements": project_obj[0].dataValues.current_announcements,
        //     ""
        //   }

        // var proj_name 
        // var current_announcements = project_objs[0].dataValues.
        // console.log(project_obj)
        console.log(result)
        res.send(result)
      });

    });
});

// Student's individual data view 
// Get all data from all projects posted by this student 

router.get('/my-data/:studentid', function(req,res){
  db.Student.findAll({ 
    where: {
      id: req.params.studentid,
    },
    include: [db.StudentToProject]
  }).then(function(result) {
      var student_objs = result; 

      // Get the ids of each of the projects the student is working on 
      var projIds = []
      for (i in student_objs){          
        projIds.push(student_objs[i].dataValues.StudentToProject.dataValues.ProjectId)
      }
      console.log("projIds" + projIds)
      // Grab data in Educator and Fieldnote tables corresponding to the projects the student is working on 
      db.Fieldnote.findAll({ 
        where: {
          ProjectId: projIds,
        }

      }).then(function(result) {

        // var project_objs = result; 

        // var project_info = []
        // for (i in projIds){

        //   var p_i = {
        //     "name": project_objs[0].dataValues.name,
        //     "current_announcements": project_obj[0].dataValues.current_announcements,
        //     ""
        //   }

        // var proj_name 
        // var current_announcements = project_objs[0].dataValues.
        console.log(result)

        var obj_for_handlebars = []
        for (i in result){
          obj_for_handlebars.push(result[i].dataValues)
        }

        console.log(obj_for_handlebars)
        res.render("my-data", {observations: obj_for_handlebars} )
      });

    });
});


// Form for posting data 
// Get project(s) this student is working to display as options in the form 

router.get('/new-entry/:studentid/:projectid', function(req,res){
	// db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
      res.send("Student's form for posting new data ");;
    // });
});

// Post new entry to the database 

router.post('/new-entry/:studentid/:projectid', function(req,res){
	// db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
      res.send("Student posted new entry to the database");;
    // });
});

// TBI: Edit an existing entry 

// router.put('/', function(req,res){
// 	db.Fieldnotes.update({
// 		// Form
// 	      // text: req.body.text,
// 	      // complete: req.body.complete
//     }, {
//       where: {
//         id: req.body.id
//       }
//     }).then(function(dbFieldnotes) {
//       res.send("Student Entry Edit");;
//     });
// });

// TBI: Delete an existing entry 

// router.delete('/', function(req,res){
//     db.Fieldnotes.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbFieldnotes) {
//       res.send("Student Entry Delete");;
//     });
// });

module.exports = router;
