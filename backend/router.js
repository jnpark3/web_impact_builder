const express = require('express');
let router = new express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const SERVER_URL = 'mongodb+srv://admin:auth@webimpact.fbbsqib.mongodb.net/?retryWrites=true&w=majority';
const JWT_SECRET_KEY = '1s4u9mwnEO1M2a@#$eAcCt4TTD@#$RgpWQlSYZWIODDKNVXM<NE$@#93h3';

mongoose.connect(SERVER_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

/* MONGOOSE SCHEMAS */

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    websites: {type: [], required: true},
    notifications: {type: [], required: true},
}, {collection: 'users'});

const User = mongoose.model('UserSchema', UserSchema);

/* ROUTER PATHS */

router.route('/verify').post( async (req, res) => {
    try {
        const token = req.body.token
        var expanded_token = jwt.verify(token, JWT_SECRET_KEY);
        res.send({
            success: true,
            payload: expanded_token.id
        })
    }
    catch (e) {
        res.send({
            success: false,
            payload: 'Token verification failed.'
        })
    }
})

router.route('/login').post( async (req, res) => {

    try{
        var username = req.body.username;
        var password = req.body.password;
    } catch(e){
        res.send({
          success: false, 
          payload: 'Improperly formatted request'
        });
    }

    try {
        var user = await User.findOne({ username }).lean();
    }
    catch (e) {
        res.send({
            success: false,
            payload: 'Network issues, may not be connected to internet'
        })
    }

    console.log(user)
    console.log(username)
    if(!user){
        res.send({
            success: false,
            payload: 'Username or password incorrect'
        });
    }

    if (await bcrypt.compare(password, user.password)) {
        var token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET_KEY)
        res.send({
            success: true,
            payload: token
        }
        );
    } else {
        res.send({
            success: false,
            payload: 'Username or password incorrect'
        });
    }
})

router.route('/register').post( async (req, res) => {

    try{
        //var token = req.body.token;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
      } catch(e){
        res.send({
          success: false, 
          payload: 'Internal Error: Request incorrectly formantted'
        });
    }

    try {
        var result = await User.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: await bcrypt.hash(password, 10),
            email: email,
            websites: [],
            notifications: [{
                title: 'Welcome to the Web Impact Builder',
                message: 'We\'re very greatful for you being here, we hope our tools can help your organization thrive online.'
            },
            {
                title: 'Create your first website',
                message: 'Start your journey by creating a new website.'
            }],
        });
    }
    catch (e) {
        res.send({
            success: false,
            payload: 'Internal Error: Uncaught error in registration of new user. Error message: ' + e
        })
        return;
    }

    try {
        var token = jwt.sign({
            id: result._id,
            username: result.username
        }, JWT_SECRET_KEY)
    } catch (e) {
        res.send({
            success: false,
            payload: 'Internal Error 2.2: Error in token creation for new user. Error message: ' + e
        })
        return;
    }

    res.send({
        success: true,
        payload: token
    })
})

router.route('/getinfo').post( async (req, res) => {
    try{
        var token = req.body.token;
    } catch(e){
        res.send({
          success: false, 
          payload: 'Internal Error: Request incorrectly formantted'
        });
    }

    try{
        var user = jwt.verify(token, JWT_SECRET_KEY);
        user = await User.findById( user.id ).lean();
    } catch(e){
        res.send({
            success: false, 
            payload: 'Network Error: Cannot reach server'
        });
    }

    res.send({
        success: true, 
        payload: {
            firstname: user.firstname,
            websites: user.websites,
            notifications: user.notifications,
        }
    });
})

router.route('/createweb').post( async (req, res) => {
    try{
        var token = req.body.token;
        var name = req.body.name;
    } catch(e){
        res.send({
          success: false, 
          payload: 'Internal Error: Request incorrectly formantted ' + e
        });
    }

    try{
        var user = jwt.verify(token, JWT_SECRET_KEY);
        user = await User.findById( user.id ).lean();
    } catch(e){
        res.send({
            success: false, 
            payload: 'Network Error: Cannot reach server with error ' + e
        });
    }

    try{
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const day = today.getDate().toString().padStart(2, "0");
        const year = today.getFullYear().toString().slice(-2);
        const formattedDate = `${month}/${day}/${year}`;
        const id = user.websites.length
        user.websites.push({
            xml: [],
            name: name,
            status: 'Not Published',
            date: formattedDate,
            id: id
        })
        await User.updateOne({ _id: user.id }, { $set: { websites: user.websites } })  
    }catch(e){
        res.send({
            success: false, 
            payload: 'Network Error: Failed to add website with error ' + e
        });
    }

    res.send({
        success: true, 
        payload: id
    });
})

module.exports = router;