console.log('WIP')
const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

router.use(limiter);

router.get('/login',function(req, res){
    let followPath = req.query.path;
    if(req.session.isAuthenticated()){
        res.redirect('http://example.com/'+followPath); //false positive
    }else{
        res.redirect('/');
    }
}); 

router.get('/goto',function(req, res){
    let url = encodeURI(req.query.url); //vulnerability
    res.redirect(url);
}); 

module.exports = router
