
const receiveAndDeleteMessage = (AWS) => {

    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    const queueURL = process.env.SQS_URL;

    const params = {
        AttributeNames: [
            "SentTimestamp"
        ],
        MaxNumberOfMessages: 1,
        MessageAttributeNames: [
            "All"
        ],
        QueueUrl: queueURL,
        VisibilityTimeout: 0,
        WaitTimeSeconds: 20
    };

    // Message receive function
    sqs.receiveMessage(params, function (err, data) {
        if (err) {
            console.log("Receive Error", err);
        } 
        else if (data.Messages) {
            // console.log("SQS DATA : - ", data);
            // console.log("-----------------------------------------------------------------");
            console.log("Number of message received: ", data.Messages.length);
            console.log("-----------------------------------------------------------------");
            console.log("Received Messages: ", data.Messages);
            // console.log("BODY : ------", JSON.parse(data.Messages[0].Body))
            const deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle
            };
            // Message delete function
            sqs.deleteMessage(deleteParams, function (err, data) {
                if (err) {
                    console.log("Delete Error", err);
                } else {
                    console.log("Message Deleted", data);
                }
            });
        }
        else {
            console.log("No message received!");
        }
    });

};

module.exports = receiveAndDeleteMessage;