const fs = require("fs");
const path = require("path");
var FCM = require("fcm-node");

const sendPushNotification = async (tokens, message) => {
  try {
    console.log("token:- " + tokens);
    console.log("message:- " + message);

    fs.readFile(
      path.join(__dirname, "../FireBaseConfig.json"),
      "utf8",
      async (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return err;
        }
        try {
          //firebase push notification send
          const data = JSON.parse(jsonString);
          //   var serverKey = data.SERVER_KEY;
          var serverKey =
            "AAAApW6PDMA:APA91bF4sMi8wAjeaX0YmR73Tzt5E15v3BwLeZYc8nOZZFDaLxjxiG1YbCkuvtkACmmyJYGynwO60jXAosqhG6AMEJrwx-F-GxMK2EzZ79GCDhFMrsllCNxwuclZQAzBiuA8A_jkoN6I";
          console.log(serverKey, "serverKey");
          var fcm = new FCM(serverKey);

          if (tokens.length > 0) {
            var pushMessage = {
              //this may vary according to the message type (single recipient, multicast, topic, et cetera)
              registration_ids: tokens,
              content_available: true,
              mutable_content: true,
              notification: {
                body: message,
                icon: "myicon", //Default Icon
                sound: "mySound", //Default sound
                // badge: badgeCount, example:1 or 2 or 3 or etc....
              },
              // data: {
              //   notification_type: 5,
              //   conversation_id:inputs.user_id,
              // }
            };

            fcm.send(pushMessage, function (err, response) {
              if (err) {
                console.log("Something has gone wrong!", err);
              } else {
                console.log("Push notification sent.", response);
              }
            });
          }
        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

let token = [
  "dVaZnmoezoiQm31M5d7Bbr:APA91bHdVqpUSIQce8ITqvLSpkKSYVMcQ8_Bt3cRZrBlBsePcAVk4Yh37b6Mz8yo-wTN9qKwUNmmFtpB5D7IwJYjpwSSTLsUqv2kQ2x_-movGWN2NO3f54fdwql9wuwi_akpSqgWmFJA",
];

sendPushNotification(token, "hello");
