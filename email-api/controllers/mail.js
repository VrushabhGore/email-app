const Mail = require('../model/mail');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');


// This gets all Email
exports.getmails = (req, res) => {
  const mails = Mail.find()
  .populate('author','_id name email')
  .select('_id subject body created')
  .then((mails)=>{
    res.status(200).json(mails)
  })
  .catch(err => console.log('Error here: ',err));
};

//This Method is used to create mail
exports.createMail = (req,res,next) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
      if (err) {
        return res.status(400).json({
          error:'Image could not be uploaded'
        })
      };
      let mail = new Mail(fields)
      mail.author = req.profile;
      if (files.photo) {
        mail.photo.data = fs.readFileSync(files.photo.path);
        mail.photo.contenType = files.photo.type;
      };
      mail.save((err,result)=>{
        // console.log('Save started', result);
        if (err) {
          return res.status(400).json({
            error:err.message
          });
        }
        console.log(result.author.name);
        res.json(result);
      })
    });

};

// Gets mail By a User
exports.mailByUser = (req,res) => {
  Mail.find({author: req.profile._id})
  .populate('author','_id name ')
  .sort('_created')
  .exec((err,mails)=>{
    if (err) {
      return res.status(404).json({
        error:err
      });
    }
    res.json(mails)
  })
}

exports.mailforUser = (req,res) => {
  Mail.find({reciever: req.profile.email})
  .populate('author','_id name email')
  .sort('_created')
  .exec((err,mails)=>{
    if (err) {
      return res.status(404).json({
        error:err
      });
    }
    res.json(mails)
  })
}

exports.mailById = (req,res,next,id) => {
  Mail.findById(id)
  .populate('author','_id name')
  .select('_id subject body reciever')
  .exec((err,mail) =>{
    if (err || !mail) {
      return res.status(400).json({
        error:err
      })
    }
    req.mail = mail
    next()
  });
}

exports.ismailer = (req,res,next) =>{
  const isMailer = req.mail && req.auth && req.mail.author._id === req.auth._id
  if (!isMailer) {
    return res.status(403).json({
      error:'User is not authorized!'
    });
    }
    next();

}

exports.deletemail = (req,res) => {
  console.log(req.mail);
  
  const mail = req.mail;
  mail.remove((err,success)=>{
    if (err) {
      return res.status(400).json({error:error})
    }
    return res.json({message:'mail successfully deleted'})
  })
}
