# train-scheduler

This app updates a schedule table with current train data.  The data is saved to a firebase database.

## How to use
* Enter train data in the "Add Train" form and submit.
    * Once submitted, the minutes until the next train and next arrival time will be calculated using moment.js.
    * The information will be logged to the firebase database and the "Current Train Schedule" table will be updated.

## Technology
* Firebase
* HTML
* CSS
* Bootstrap
* JavaScript
* jQuery
* moment.js