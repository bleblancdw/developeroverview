'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var Logger = require('dw/system/Logger');
var ProductMgr = require('dw/catalog/ProductMgr');
var URLAction = require('dw/web/URLAction');
var URLUtils = require('dw/web/URLUtils');

server.get('Hello', cache.applyDefaultCache, function (req, res, next) {
    res.render('/hello');
    next();
});

server.get('HelloWorld', cache.applyDefaultCache, function (req, res, next) {
    res.render('/helloworld');
    next();
});

server.get('ShowParam', cache.applyDefaultCache, function (req,res,next) {
	
	if (req.querystring.foo === undefined)
		{	
			res.render('/paramnotfound');
			Logger.warn('parameter not passed into function');
			next();
		}
	else
		{
			var param = req.querystring.foo;
			res.render('/showparam',{param : param});
			next();
		}
});

server.get('ShowProduct', cache.applyDefaultCache, function(req,res,next){

	if (req.querystring.pid === undefined)
		{	
			res.render('/paramnotfound');
			/*Logger.warn('parameter not passed into function')*/
			next();
		}
	else
		{
			var product = ProductMgr.getProduct(req.querystring.pid);
			res.render('/showproduct',{product: product, decorated: false});
			next();
		}
});

server.get('ShowProductDecorated', cache.applyDefaultCache, function(req,res,next){

	if (req.querystring.pid === undefined)
		{	
			res.render('/paramnotfound');
			/*Logger.warn('parameter not passed into function')*/
			next();
		}
	else
		{
			var product = ProductMgr.getProduct(req.querystring.pid);
			res.render('/showproductdecorated',{product: product, decorated: true});
			next();
		}
});

server.get('Links', cache.applyDefaultCache, function (req, res, next) {
	
	var urlAction1 = new URLAction('Demo-Links', 'MobileFirstSG', 'en_US');
	var url1 = URLUtils.abs(false, urlAction1);

	var urlAction2 = new URLAction('Demo-Links', 'MobileFirstSGGlobal', 'fr_FR');
	var url2 = URLUtils.abs(false, urlAction2);
	
	var urlAction3 = new URLAction('Demo-Links', 'MobileFirstSGGlobal', 'en_GB');
	var url3 = URLUtils.abs(false, urlAction3);
	
	res.render('/links',{url1 : url1, url2: url2, url3: url3});
	next();
});

server.get('Links2', cache.applyDefaultCache, function (req, res, next) {
		
	res.render('/linkspages');
	next();
});

module.exports = server.exports();