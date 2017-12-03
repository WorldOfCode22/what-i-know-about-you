// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var router = express.Router();

router.get('/',(req,res)=>{
  var UAParser = require('user-agent-parser');
  var accepts = require('accepts');
  var ua = req.headers['user-agent'];
  var parse = new UAParser(ua);
  var ip =  req.headers['x-forwarded-for'].split(',').splice(0,1).toString();
  var os = parse.getOS();
  os = os.name + ' ' + os.version;
  var browser = parse.getBrowser();
  browser = browser.name + ' ' + browser.version;
  var cpu = parse.getCPU();
  cpu = cpu.architecture;
  var lan = accepts(req).languages().toString();
  var requestedObject = {ip:ip,OS:os,browser:browser,cpu:cpu,lan:lan};
  res.send(requestedObject);
});

app.use('/',router);
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
