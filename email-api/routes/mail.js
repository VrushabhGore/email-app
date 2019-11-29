const express = require('express')
const {requireSignin} = require('../controllers/auth')
const {getmails,createMail,mailByUser,mailById,deletemail,ismailer,mailforUser } = require('../controllers/mail')
const {createMailValidator} = require('../validator')
const {userById} = require('../controllers/user')

const router = express.Router();

router.get('/mails',getmails);
router.get('/mail/by/:userId',requireSignin,mailByUser);
router.get('/mail/inbox/:userId',requireSignin,mailforUser);
router.post('/mail/new/:userId',requireSignin,createMail,createMailValidator);
router.delete('/mail/:mailId',deletemail)
// any route containing userId, our app will execute userById method
router.param('userId',userById)
router.param('mailId',mailById)

module.exports =  router;
