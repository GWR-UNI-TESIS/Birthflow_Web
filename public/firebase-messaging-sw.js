// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCY1chhGkPHLAmLPiqMstT5UcnPNI5hqOY",
    authDomain: "birthflowdev.firebaseapp.com",
    projectId: "birthflowdev",
    storageBucket: "birthflowdev.firebasestorage.app",
    messagingSenderId: "1017128864839",
    appId: "1:1017128864839:web:7bd2a9981ebbd4733d3562",
    measurementId: "G-6B822ERSLZ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
