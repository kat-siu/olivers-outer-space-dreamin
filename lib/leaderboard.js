var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

class Leaderboard {
  constructor(canvas) {

    this.topScores = [];

    this.config = {
      apiKey: "AIzaSyB2IIfUzspWbw_xc4PtUrWlv6bZLMyiGN0",
      authDomain: "oliversouterspacedream.firebaseapp.com",
      databaseURL: "https://oliversouterspacedream.firebaseio.com",
      projectId: "oliversouterspacedream",
      storageBucket: "oliversouterspacedream.appspot.com",
      messagingSenderId: "899628872335"
    };

    this.firebaseApp = firebase.initializeApp(this.config);
  }

  readData() {
    $('#scores').html("");
    this.ref = this.firebaseApp.database().ref('scores');
    this.ref.orderByChild('score').limitToLast(5).once("value").then(function(snapshot) {
        snapshot.forEach(function(data) {
          var playerScore = data.val();
          $('#scores').prepend('<li>' + playerScore.name + ":  " + playerScore.score + '</li>');
        });
    });
  }

  writeScoreData(name, score) {
    if (name.trim() == "") {
      name = "Oliver";
    }
    this.firebaseApp.database().ref('scores/').push({
      name: name,
      score: score
    });
  }
}

module.exports = Leaderboard;
