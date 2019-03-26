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

 // Current Time
 var currentTime = moment();

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

    //clear form
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
    
});

//create Firebase event to add train to database and update HTML
database.ref().on("child_added", function(childSnapshot) {

    //Store data in variables
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTime;
    var trainFreq = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextConverted = moment(nextTrain).format("hh:mm a");

    //update html  
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextConverted),
        $("<td>").text(tMinutesTillTrain)
    );

    $("#train-table > tbody").append(newRow);

// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});