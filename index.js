const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// var contactList=[
//     {
//         name:"Mayank jain",
//         phone:"111111111111"
//     },
//     {
//         name:"Hello",
//         phone:"1111"
//     },
//     {
//         name:"helloworld",
//         phone:"111"
//     }
// ]
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"Contacts List",
            contact_list:contacts
        });
    });
    // return res.render('home',{
    //     title:"Hello i am flying",
    //     contact_list:contactList
    // });
});
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"hello"
    });
})
app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
    // contactList.push({
        // name:req.body.name,
        // phone:req.body.phone
    // });
    //contactList.push(req.body);
    //return res.redirect('/');
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('****',newContact);
        return res.redirect('back');
    });
});
app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    // let phone=req.query.phone;
    // let contactIndex=contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex !=-1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('/');
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});
app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('yup my express server is up and running on port',port);
});