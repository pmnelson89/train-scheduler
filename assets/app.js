//initialize Firebase
var config = {
    apiKey: "AIzaSyAimShetCwBhcCPIRr0DPd_VBMP7ONzktc",
    authDomain: "train-scheduler-541f3.firebaseapp.com",
    databaseURL: "https://train-scheduler-541f3.firebaseio.com",
    projectId: "train-scheduler-541f3",
    storageBucket: "train-scheduler-541f3.appspot.com",
    messagingSenderId: "760004400683"
};
firebase.initializeApp(config);

var database = firebase.database();

//add train button
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //grab input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = $("#first-train-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    //create object for train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        firstTime: trainFirst,
        frequency: trainFreq
    };

    //uploads train data to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    //change to modal
    alert("Train successfully added");

    //clear form
    clearTrain();

});

//function to clear input form
function clearTrain() {
    $("#train-name-input").empty();
    $("#destination-input").empty();
    $("#first-train-input").empty();
    $("#frequency-input").empty();
}

  //create Firebase event to add train to database and update HTML
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    //Store data in variables
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTime;
    var trainFreq = childSnapshot.val().frequency;

    //train info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);

    //format first time
    //var firstTrainTime = 

    //calculate time until the next train
    //var nextTrain =
    //console.log(nextTrain);

    //calculate min away
    //var minAway =
    //console.log(minAway);

    //update html  
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
       // $("<td>").text(nextTrain),
        $("<td>").text(trainFreq),
       // $("<td>").text(minAway)
    );

    $("#train-table > tbody").append(newRow);
});