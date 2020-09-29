require('dotenv').config();

const AWS = require('aws-sdk');

const sendMessage = require('./sendMessage');
const receiveAndDeleteMessage = require('./receiveMessage');

AWS.config.update({ region: 'REGION' });

const implementingSQS = () => {
    // sendMessage(AWS);
    receiveAndDeleteMessage(AWS);
};

implementingSQS();