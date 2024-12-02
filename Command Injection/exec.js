const express = require('express');
const router = express.Router()

const { exec, spawn, execFile }  = require('child_process');


router.post('/ping', (req,res) => {
    exec(`${req.body.url}`, (error) => {
        if (error) {
            return res.send('error');
        }
        res.send('pong')
    })
    
})

router.post('/gzip', (req,res) => {
    const filePath = req.query.file_path;
    const allowlist = ['/valid/path1', '/valid/path2']; // Update this list with valid file paths
    if (allowlist.includes(filePath)) {
        execFile('gzip', [filePath], function (err, data) {
            console.log('err: ', err)
            console.log('data: ', data);
            res.send('done');
        });
    } else {
        res.status(403).send('File path not allowed');
    }
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
