var source = new EventSource('http://gilles.local:3001/stream');

source.onmessage = function(e) {
  parseMessage(e);
};

function parseMessage(e) {
  var data = e.data;

  printLn('data: ' + data);

  // convert to percentage, change milk values
  var pct = data / 10;

  updateMilk(pct);
}

// Print a message to the debug console
function printLn(msg) {
  console.log(msg);

  var dbg = document.getElementById('debug');
  dbg.innerHTML += msg + '<br>';
  dbg.scrollTop = dbg.scrollHeight;
}

function updateMilk(val) {

  var bottle = $('.milk__bottle');
  var milk   = $('.milk__bottle .the-milk');
  var pct    = $('.milk__bottle .percentage');

  var expressions = ['zero', 'twenty', 'forty', 'sixty', 'eighty', 'one-hundred'];
  var expression  = '';

  var visualVal = val;

  // negate values > 85%
  if (val > 85)
    visualVal = 85;

  // calculate the percentage bracket for milk expressions

  if (val > 0) // 0 - 20
    expression = 'twenty';

  if (val > 20) // 20 - 40
    expression = 'forty';

  if (val > 40) // 40 - 60
    expression = 'sixty';

  if (val > 60) // 60 - 80
    expression = 'eighty';

  if (val > 80) // 80 - 100
    expression = 'one-hundred';

  // update the milk
  milk.css('height', visualVal + '%');

  // update percentage value
  pct.html(Math.floor(val) + '%');

  // update expression
  bottle.removeClass(expressions.join(' '));
  bottle.addClass(expression);
}


var relayr = RELAYR.init({
  appId: "aafaa8a6-58b5-4f8a-9485-018846e695f3",
  redirectUri:"http://localhost"
});

/*
    Ugly smugly JS web client integration
*/

relayr.login({
  success: function(token){
  console.log("Relayr JS Client connected")
  }
});

 relayr.devices().getDeviceData({
    deviceId: "6c165856-aeb1-4c45-a779-bce18a7a1044", 
    token: "jpWnlsJTYBMXmyTjJIq8b4zOS2vYrWw6",
    incomingData: function(data){
      var i = data.readings[1].value.y;
      var j = (i*100);
      console.log("Accelerometer, y_axis: " + j);
      tilt(j);
    }
  });

function tilt(input){
  var pw = $('#milk__bottle');
  console.log("milk tilt value: " + input);
            pw.css({'transform': 'rotate('+input+'deg)'});
}
