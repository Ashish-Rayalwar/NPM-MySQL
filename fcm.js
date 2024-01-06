const { getToken } = require("firebase/messaging");
const { messaging } = require("./firebaseAuth");

async function requestPermission() {
  //   const permission = await Notification.requestPermission();
  console.log("working");
  let permission = "granted";
  if (permission === "granted") {
    // Generate Token
    const token = await getToken(messaging, {
      vapidKey:
        "BBLpNQX9AzJUn2OZn8BaA_ojbRKuSll5hvAuVqXuh9MsXjn3gcQChQXFEvJTCgAs_H0RdYIkLw9QB_Np6aLxRrE",
    });
    console.log("Token Gen", token);
    // Send this token  to server ( db)
  } else if (permission === "denied") {
    alert("You denied for the notification");
  }
}

requestPermission();
