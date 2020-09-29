const sendMessage = (AWS) => {
    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

    const params = {
        DelaySeconds: 0,
        MessageAttributes: {
            "Title": {
                DataType: "String",
                StringValue: "The Whistler"
            },
            "Author": {
                DataType: "String",
                StringValue: "John Grisham"
            },
            "WeeksOn": {
                DataType: "Number",
                StringValue: "6"
            }
        },
        MessageBody: "Message from node js app.",
        QueueUrl: process.env.SQS_URL
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
};

module.exports = sendMessage;
