const fs = require('fs');

let robotText = 'init text';
fs.readFile('robot/head.txt', 'utf8', function(err, headText) {
    fs.readFile('robot/body.txt', 'utf8', function(err, bodyText) {
        fs.readFile('robot/leg.txt', 'utf8', function(err, legText) {
            fs.readFile('robot/feet.txt', 'utf8', function(err, feetText) {
                robotText = headText + '\n' + bodyText  + '\n' + legText  + '\n' + feetText;
                fs.writeFile('robot/robot.txt', robotText, 'utf8', function(err) {
                    fs.readFile('robot/robot.txt', 'utf8', function(err, finalText) {
                        console.log(finalText);
                    });

                });
                console.log(feetText);
            });
            console.log(legText);
        });
        console.log(bodyText);
    });
    console.log(headText);
});

console.log(robotText);