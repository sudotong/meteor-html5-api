meteor-html5-api
================
Rich HTML5 APIs wrapped for using with Meteor including Desktop Notifications, Geo Location, Network Information, Page Visibility, Speech Synthesis, Speech Recognition and Mobile Vibration


----------
This package is a wrapper for some popular HTML5 APIs which includes

 - Geolocation
 - Network Information
 - Page Visibility
 - Speech Recognition
 - Speech Synthesis
 - Vibration API
 - Browser Desktop Notifications

Install
-------

    meteor add gunjansoni:html5-api

Usage
-----
The package exports `Html5Api` on the client side.

    var html5api = new Html5Api();


----------


### Geo Location

    var geoLocation = html5api.geoLocation();

The requests the permission from the user to access their location on the browser. Once the request has been approved,  you can get the location.

If the user has not approved the request, the variable `geolocation` would be `false`.

    if (geoLocation) {
        geoLocation.getLocation(function(err, res){
            if (err) console.log(err);
            else console.log(res);
        });
    }

Upon success, the res variable will be something like this:

    {
        accuracy: 30 // in meters
        altitude: null
        altitudeAccuracy: null
        heading: null
        latitude: <latitude>
        longitude: <longitude>
        speed: null
        timestamp: 1457901207220
    }

You can also watch a user's location

    if (geoLocation) {
        geoLocation.watch(function (err, res) {
            if (err) console.log(err);
            else {
                // the result will be in res.result
                console.log(res.result);
                Meteor.setInterval(function () {
                    // to stop watching a location, you need a watchId which is available in res.watchId when the watch started
                    geoLocation.stopWatching(res.watchId);
                }, 30 * 1000);
            }
        });
    }
Some other options available with Geo Location API is

 - **enableHighAccuracy**: A function that expects a boolean to enable or disable high accuracy. Defaults to **true**.
 - **timeout**: A function that expects an timeout value in ms. Defaults to **10000** *(10 seconds)*
 - **maximumAge**: A function that expects a value in ms. Defaults to **30000** *(30 seconds)*

----------


### Network Information

    var networkInformation = html5Api.networkInformation();

Network Information currently is not available on Desktop, however, mobile browsers support Network Information.

You can get the current Network's information using `connectionInformation`

    if (networkInformation) {
        console.log(networkInformation.connectionInformation);
    } else {
        console.log("Network Information is not supported!");
    }

`networkInformation.connectionInformation` will return something like this:

if the connection is metered, the result will be an object

    {
        bandwidth: <current bandwidth>,
        metered  : <metered or not metered>
    }
for a normal connection, the result will be a string
the return value would be "**wifi**" or "**cellular**"


----------

### Page Visibility

    var pageVisibility = html5Api.pageVisibility();
The page visibility api returns if the page is active or not. It could be determined anytime by calling the `state` function.

    if(pageVisibility) console.log("The current page visibility is " + pageVisibility.state());

`state` function returns a string which either `visible` or `hidden` value

There is also an `onChange` event for page visibility which could be used as 

    pageVisibility.onChange(function () {
        console.log("The Current Page Visibility is " + pageVisibility.state());
    });
The `onChange` event is triggered when the page visibility changes


----------
### Speech Recognition

    var speech = html5Api.speechRecognition();
This is an HTML5 API used in browsers to convert speech to text. 

By calling `html5Api.speechRecognition()` the browser will request to access the microphone. Once the request has been approved, the user can speak and that would be converted to text.

if the request is not approved or the browser is not compatible the `speech` variable will be **false**.

    if(speech) {
        speech.start(function (err, res) {
            if (err) console.log(err);
            else {
                console.log(res);
                Meteor.setTimeout(function () {
                    speech.stop();
                }, 5000);
            }
        });
    }

You will have multiple results returning as the user speaks which will be something like

    {
        text: "Hello",
        isFinal: false
    }
However, the final result would include a **confidence** key *(a percentage value)* with **isFinal** being **true** with it which will help you take a decision whether to prompt the user if the input was correct.

You can disable this by passing an extra parameter to the start function as **false** to wait until the end of the callback like this

    speech.start(function (err, res) {
        // do your stuff
    }, false);
This will wait for the user to complete before sending back the result.


----------
### Speech Synthesis

    var speakApi = html5Api.speechSynthesis();

Speech Synthesis converts text to speech. It can read out text.

The usage is pretty simple

    speakApi.speak("Hello World!");
However, we have different options available.

 - speak: Reads out text. Accepts three parameters
   - text : Text to speak out
   - startCallback *(optional)* : A callback function run when the reading started
   -  endCallback *(optional)*: A callback function run when the reading finished
 - stop : Stops reading
 - pause : Pauses reading
 - resume : Resumes reading from where last paused
 - setRate : accepts a float value between **0.1** to **10** to read faster or slower. *(Defaults to 1)*
 - setPitch : accepts a float value to adjust the pitch between **0.1** and **2**. *(Defaults to 1)*
 - getVoices : get an array of available voices to choose from. The object has keys
   - name : Name of the Voice
   - lang : Language of the Voice *Required to set voice*
   - uri : A voice URI
 - setVoice : accepts string as the *lang* from getVoices function

----------
### Vibration

    var vibrationApi = html5Api.vibration();
The vibration api works on Mobile browsers. The usage is very simple.

To vibrate once

    vibrationApi.vibrate();
To vibrate thrice

    vibrationApi.vibrate(3);
Or for a custom vibration pass an array

    vibrationApi.vibrate([1000, 500, 1000, 500, 2000]);

Optionally, you can stop a vibration by calling `stop`

    vibrationApi.stop();


----------
### Browser Desktop Notifications (Web Notifications)

    var webNotification = html5Api.webNotification();
By doing this, a permissions window would pop up on the browser asking permission if the application could show Desktop Notifications.

If the permission was denied or the browser is not supported the variable `webNotification` would be **false**.

Once we have the access, we can send browser notifications using

    if (webNotification) {
        webNotification.notify("Some Title", "Some Text!", {
            icon : "/images/favicon.png",
            sound: "/Notifications/tone.mp3"
        });
    }

Optionally, we can input events as the 4th parameter like

    if (webNotification) {
        webNotification.notify("Some Title", "Some Text!", {
            icon : "/images/favicon.png",
            sound: "/Notifications/tone.mp3"
        }, {
            onclick: function(e) {
                console.log("Do something or call window.open to open the window");
            },
            onshow: function() {
                console.log("Notification was shown!");
            }
        });
    }
[Here](https://developer.mozilla.org/en/docs/Web/API/notification) is a nice article showing all the options available.


----------

*In case you feel you can add to this package, please submit a pull request on the Github repo or raise any issues on the Github page, if there are any.*

### License
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)