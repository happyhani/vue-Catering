var express = require('express');
var router = express.Router();

router.get('/',function (req, res, next) {
	res.set('x-XSS-Protection',0);
	res.render('xss',{'title':"Express", xss:req.query.xss});
});
