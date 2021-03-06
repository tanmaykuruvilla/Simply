/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
        //add a listener to watch the battery status.
        window.addEventListener('batterystatus', app.displayBatteryStatus, false);
        //switch of flashlight on exit using back button
        document.addEventListener("backbutton", function() {
                window.plugins.flashlight.switchOff();
                navigator.app.exitApp();
        }, false);
        //auto start the app on phone boot  note: only works for android
        cordova.plugins.autoStart.enable();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    },

    openDialer: function(number) {
        console.log("Dialer Opening ...." + number);
        window.open('tel:'+ number, '_system');
    },

    openMessenger: function() {
        console.log("Messenger Opening ....");
        window.open('sms:', '_system');
    },

    displayDeviceInfo: function() {
        $("#deviceinfo").html('Cordova Version ' + device.cordova + '<br>');
        $("#deviceinfo").append('Model '+ device.model + '<br>');
        $("#deviceinfo").append('Platform '+ device.platform + '<br>');
        $("#deviceinfo").append('Manufacturer '+device.manufacturer );
    },

    openCamera: function() {
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, {destinationType: Camera.DestinationType.FILE_URL, saveToPhotoAlbum: true});
    },

    displayBatteryStatus: function(info) {
        $("#batteryinfo").html('<i class="fa fa-battery-three-quarters"> Level: ' + info.level + '%<br>');
        if(info.isPlugged)
            $("#batteryinfo").append('Charging... <br>');     
    },

    cameraSuccess: function(imageURI) {
        console.log("Camera Opening...." + imageURI);
    },
    
    cameraError: function (message) {
        console.log("ERROR in CAMERA");
    },
    
    openVideos: function () {
        console.log("Messenger Opening ....");
        window.location = "videos.html";
    },

    toggleFlashlight: function () {
        $('#flashlight').toggleClass('clicked');
        window.plugins.flashlight.toggle();
    },

    openNativeApp: function (application) {
        var successCallback = function (data) {
            console.log("Success!");
            // if calling canLaunch() with getAppList:true, data will contain an array named "appList" with the package names of applications that can handle the uri specified.
        };
        var errorCallback = function (errMsg) {
            alert("Error! " + errMsg);
        };
		var confirmAction = function(buttonIndex) {
			if(buttonIndex === 1) {
				window.plugins.launcher.launch({packageName: 'com.android.settings'}, successCallback, errorCallback);
			}
		};
        try {
            console.log("Settings Opening ....");
            switch(application){
                case "settings":
                    window.plugins.launcher.launch({packageName: 'com.android.settings'}, successCallback, errorCallback);
                    break;
                case "music":
                    window.plugins.launcher.launch({packageName: 'com.google.android.music'}, successCallback, errorCallback);
                    break;
                case "wifi":
                    navigator.notification.confirm("Please select \"WiFi\" from the list after hitting OK", confirmAction, "WiFi");
                    break;
                case "data":
                    navigator.notification.confirm("Please select \"Data Usage\" from the list after hitting OK", confirmAction, "Data Usage");
					break;
                default:
                    console.log("no support to open the application");    
            }
        } catch (err) {
            console.log(err);
        }
    },
	
	takeBackToApp: function() {
		window.location = "index.html";
		this.displayBatteryStatus();
	}
};

