const express = require('express');
const router = express.Router()
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

router.use(limiter);

const { exec, spawn }  = require('child_process');

router.post('/ping', (req,res) => {
    const sanitizedUrl = req.body.url.replace(/[^a-zA-Z0-9]/g, '');
    exec(`${sanitizedUrl}`, (error) => {
        if (error) {
            return res.send('error');
        }
        res.send('pong')
    })
    
})

router.post('/gzip', (req,res) => {
    const sanitizedFilePath = req.query.file_path.replace(/[^a-zA-Z0-9.\/_-]/g, '');
    exec(
        'gzip ' + sanitizedFilePath,
        function (err, data) {
          console.log('err: ', err)
          console.log('data: ', data);
          res.send('done');
    });
})

router.get('/run', (req,res) => {
   let cmd = req.params.cmd;
   runMe(cmd,res)
});

function runMe(cmd,res){
//    return spawn(cmd);

    const cmdRunning = spawn(cmd, []);
    cmdRunning.on('close', (code) => {
        res.send(`child process exited with code ${code}`);
    });
}

module.exports = router
