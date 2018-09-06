var child_process = require('child_process');

child_process.exec(__dirname+'/update.bat', function(error, stdout, stderr) {
    console.log(stdout);
});
