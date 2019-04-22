var express = require('express');
var Tesseract = require('tesseract.js')
var app = express();
var crypto = require('crypto');
var fs = require('fs');

var ntext;
app.get('/', function (req, res) {
   res.send('<a href="read">read</a>');
})

function randomValueHex(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len) // return required number of characters
}


app.get('/read', function (req, res) {
 
   
   image = require('path').resolve(__dirname, 'text4.png');
   
   Tesseract.recognize(image, {
    lang: 'spa'})
    .then(data => {
        console.log('then\n', data.text);
		ntext=data.text;
		  res.send(data.text+'</br>'+'<a href="send">send ---> </a>');
    })
    .catch(err => {
      console.log('catch\n', err);
    })
    .finally(e => {
      console.log('finally\n');
    //  process.exit();
    });
   
})

////function create hash whit nonce and saved
function create(ha,dif){
	
	var resp = ha.substring(dif, 64);
	var hashn='123';
	console.log(ha.length);

	 var nonce=randomValueHex(dif);
nnonce=nonce+resp;
console.log(nnonce);
	
var respn='123';	
var cont=0;
while (respn!='000') {
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

fs.appendFile('filedb.bc', ',{"hash126":"'+ha+'","nhash":"'+has1+'","nonce":"'+nonce+'","text":"'+ntext+'"}', function (err) {
  if (err) throw err;
  console.log('Updated!');
});

}


/////
app.get('/send', function (req, res) {
	
	 res.send(ntext+'</br>'+'<a href="send">saved ---> </a>');
var hashn = crypto.createHash('sha256').update('criptopassword').digest('hex');	
create(hashn.toString('utf8'),3);	
})

app.get('/test2', function (req, res) {
 
   
   image = require('path').resolve(__dirname, 'W2.png');
   
   Tesseract.recognize(image)
    .progress(message => console.log(message))
	.then(data => {
        console.log('then\n', data.text);
		  res.send(data.text);
    })
    .catch(err => {
      console.log('catch\n', err);
    })
    .finally(e => {
      console.log('finally\n');
      process.exit();
    });
   
})

app.get('/test3', function (req, res) {
  var ocr = require('colissimo-ocr');
ocr.guessTextFromImage('W2.png', function(err, str) {
    if (err)
        console.log('Error: ' + err);
    else
        console.log('Text: ' + str);
});
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})