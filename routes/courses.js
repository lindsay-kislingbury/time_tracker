var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

//Display courses page
router.get('/', function(req,res,next){
    dbConn.query('SELECT * FROM courses ORDER BY idcourse desc', function(err,rows){
        if(err){
            req.flash('error',err);
            //render to views/courses/index.ejs
            res.render('courses',{data:''});
        }
        else{
            //render to views/courses/index.ejs
            res.render('courses',{data:rows});
        }
    });
});

//Display add course page
router.get('/add', function(req,res,next){
    //render to add.ejs
    res.render('courses/add', {
        name: '',
    })
})

//Add a new course
router.post('/add', function(req,res,next){
    let name = req.body.name;
    let errors = false;

    //if error
    if(name.length===0){
        errors = true;

        //set flash message
        req.flash('error', "Please enter a course");
        //render to add.ejs with flash message
        res.render('courses/add', {
            name: name
        })
    }

    //if no error
    if(!errors){
        var form_data = {
            coursename: name
        }

        //insert query
        dbConn.query('INSERT INTO courses SET ?', form_data, function(err,result){
            if(err){
                req.flash('error',err)
                //render to add.ejs
                res.render('courses/add', {
                    name: form_data.name
                })
            }
            else{
                req.flash('success', 'Course successfully added');
                res.redirect('/courses');
            }
        })
    }
})

//display edit course page
router.get('/edit/(:id)', function(req,res,next){
    let id = req.params.id;

    dbConn.query('SELECT * FROM courses WHERE idcourse = '+ id, function(err,rows,fields){
        if (err) throw err

        //if course not found
        if(rows.length <= 0){
            req.flash('error', 'Course not found with id = ' + id)
            res.redirect('/courses')
        }
        //if book found
        else{
            res.render('courses/edit', {
                title: 'Edit Course',
                id: rows[0].idcourse,
                name: rows[0].coursename
            })
        }
    })
})

//update course data
router.post('/update/:id', function(req,res,next){
    let id = req.params.id;
    let name = req.body.name;
    let errors = false;

    if(name.length  === 0){
        errors = true;

        //set flash message
        req.flash('error', "Please enter course name");
        //render to add.ejs with flash message
        res.render('courses/edit', {
            id:req.params.id,
            name: name
        })
    }

    //if no error
    if (!errors){
        var form_data = {
            coursename: name
        }
        //update query
        dbConn.query('UPDATE courses SET ? WHERE idcourse = ' + id, form_data, function(err, result){
            //if (err) throw err
            if (err){
                //set flash message
                req.flash('error',err)
                //render to edit.ejs
                res.render('courses/edit',{
                    id: req.params.id,
                    name: form_data.name
                })
            }
            else{
                req.flash('success', 'Book successfully updated');
                res.redirect('/courses');
            }
        })
    }
})

//delete course
router.get('/delete/:id', function(req,res,next){
    let id = req.params.id;

    dbConn.query('DELETE FROM courses WHERE idcourse = ' + id, function(err, result){
        //if(err) throw err
        if(err){
            //set flash messsage
            req.flash('error',err)
            //redirect to courses page
            res.redirect('/courses')
        }
        else{
            //set flash message
            req.flash('success', 'Course successfully deleted! ID = ' + id)
            //redirect to courses page
            res.redirect('/courses')
        }
    })
})

module.exports = router;