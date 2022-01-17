var express        = require('express');
var session = require('express-session');
require('dotenv').config();

var axios = require('axios');

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = process.env.CLIENT_ID;
const TWITCH_SECRET    = process.env.CLIENT_SECRET;
const SESSION_SECRET   = process.env.EXPRESS_SECRET;
// Initialize Express and middlewares
var app = express();
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(express.static('public'));

const getOauthToken = new Promise((resolve, reject) => {
  axios.post(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_SECRET}&grant_type=client_credentials`)
    .then(resp => {
      resolve(resp.data.access_token);
    })
    .catch(err => reject(err));
})

const getChannelLiveStatus = (channelName, oauth) => new Promise((resolve, reject) => {
  // console.log('channel: ', channelName, oauth)
  axios.defaults.headers.common['Client-ID'] = TWITCH_CLIENT_ID; axios.defaults.headers.common['Authorization'] = `Bearer ${oauth}`;
  axios.get(`https://api.twitch.tv/helix/streams?user_login=${channelName}`)
    .then(resp => {
      const isLive = resp.data && resp.data.data && !!resp.data.data.length
      // console.log('it worked?!', resp.data, isLive);
      resolve(isLive);
    })
    .catch(err => resolve(false))
})

app.get('/live-status', function (req, res) {
  const channel = req.query.channel;
  getOauthToken.then(oauth => {
    getChannelLiveStatus(channel, oauth).then(isLive => res.send({isLive}));
  })
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Twitch live status checker listening on port 8080!')
});