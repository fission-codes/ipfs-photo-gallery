const axios = require('axios');
const express = require('express');
const router = express.Router();
const querystring = require('querystring');

const ipfsProvider = process.env.INTERPLANETARY_FISSION_URL || 'http://localhost:1337';
const username = process.env.INTERPLANETARY_FISSION_PASSWORD || "ca2c70bc13298c5109ee";
const password = process.env.INTERPLANETARY_FISSION_USERNAME || "VJ_u+fou!VRF9+MBOeyAw4LQnrqD4*C1sHcl2Cgl2NAjV.XAiAspSv+9!w";
const auth = {username, password};
const title = "The FISSION Mini Pinboard";

router.get('/', function(req, res, next) {
  axios
    .get(ipfsProvider + '/ipfs/cids/', {auth})
    .then(({data: cids}) => res.render('index', {cids, ipfsProvider, title}))
    .catch(console.error);
});

router.post('/pin', function(req, res) {
  const {cid} = req.body;

  axios
    .put(ipfsProvider + '/ipfs/' + cid, {}, {auth})
    .catch((error) => {
      console.error(error.stack);
      res.status(500).render('error', {error, message: 'Unable to pin CID ' + cid + "."});
    })
    .then(() => res.redirect('/'));
});

router.post('/upload', function(req, res) {
  if (Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const {data, name} = req.files.newImage;
  const headers = { 'content-type': 'application/octet-stream' };

  axios
    .post(ipfsProvider + '/ipfs?name=' + name, data, {auth, headers})
    .catch((error) => {
      console.error(error.stack);
      res.status(500).render('error', {error, message: 'Unable to upload. Please try again.'});
    })
    .then(() => res.redirect('/'));
});

module.exports = router;
