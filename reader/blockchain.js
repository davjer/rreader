var http = require('http');
var fs = require('fs');
var express = require('express');
var crypto = require('crypto');


var app = express();

function randomValueHex(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len) // return required number of characters
}

function create(ha,dif){
	
	var resp = ha.substring(dif, 64);
	var hashn='1234';
	console.log(ha.length);

	 var nonce=randomValueHex(dif);
nnonce=nonce+resp;
console.log(nnonce);
	
var respn='1234';	
var cont=0;
while (respn!='0000') {
  // code block to be executed
 cont++;  
 var nonce=randomValueHex(dif);
nnonce=nonce+resp;
  
var hashn = crypto.createHash('sha256').update(nnonce).digest('hex');
has1=hashn.toString('utf8');
respn = has1.substring(0, dif);
console.log(cont+':'+respn+' hash:'+has1);
  }

 console.log('nonce:'+nonce+' nhash:'+has1); 
console.log(has1.length);
console.log('hash:'+ha+' hasht'+resp);
}


app.get('/ha', function (req, res) {

var hashn = crypto.createHash('sha256').update('clavesecreta').digest('hex');

 console.log('first hash:'+hashn.toString('utf8'));
 create(hashn.toString('utf8'),4);

});

app.get('/w', function (req, res) {
   //res.send('cripto');

   const secret = 'abcdefg';
   const hash = crypto.createHash('sha256');
   var nonce='f';
				   
	//n=create(hash);		   
	
    hash.update('aasdfa').digest('hex');
//	return '{"hasn":"'+hash+'","nonce":"'+nonce+'"}';			   
				   
   console.log(hash.digest('hex'));
   //res.send('{"hash":'+hash.digest('hex')+',"hash12":'+hash.digest('hex')+'}');
// Prints:

  
  /*
  fs.readFile('filedb.bc', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });*/

fs.appendFile('filedb.bc', ',{"hash126":"texto prueba","hash":"texto prueba2"}', function (err) {
  if (err) throw err;
  console.log('Updated!');
});
  
  
});


app.get('/r', function (req, res) {

var fs = require('fs');
var obj;
fs.readFile('filedb.bc', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  arr=obj.map(function(x) {return x.id});
  console.log(obj.map(function(x) {return x.id}));
console.log(arr[1]);   
   res.send(data);
});
 }); 
  
  
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})