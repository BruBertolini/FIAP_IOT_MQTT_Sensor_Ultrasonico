var five = require('johnny-five');
var express = require('express');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://iot.eclipse.org');

var board = new five.Board({ 'port': 'COM3' });
var app = express();

var distance;
var lastStatus;
board.on('ready', function () {
        
    var proximity = new five.Proximity({
        controller: "HCSR04",
        pin: 7
    });

    proximity.on("change", function () {
        //console.log("The obstruction has moved.", this.cm);
        distance = this.cm;
        var currStatus;


        if (distance < 10) {
            currStatus = '1';
        } else {
            currStatus = '0';

        }

        if(lastStatus != currStatus){
            lastStatus = currStatus;
            console.log('Mudou status');
            client.publish('janela05', currStatus);
        }

        
    });
});



app.listen(3000, function () {
    console.log('Listening on port ${3000}')
});