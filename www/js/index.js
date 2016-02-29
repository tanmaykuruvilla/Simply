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
        app.receivedEvent('deviceready');
        //add a listener to watch the battery status.
        window.addEventListener('batterystatus', app.displayBatteryInfo, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        app.displayDeviceInfo();
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

    displayBatteryInfo: function(info) {
        console.log("In battery status.....")
        $("#batteryinfo").html('Level: ' + info.level + '%<br>');
        $("#batteryinfo").append('Plugged: '+ info.isPlugged + '<br>');     
    },

    cameraSuccess: function(imageURI) {
            console.log("Camera Opening...." + imageURI);
    },
    
    cameraError: function (message) {
        console.log("ERROR in CAMERA");
    },

    toggleFlashlight: function () {
        // alert("flashlight ");
        // window.plugins.flashlight.available(function(isAvailable) {});
        window.plugins.flashlight.toggle();
    },
	
	toggleFlashlightButton: function() { 
	        $('#toggleButton').toggleClass('disableButton activeButton');
    },  
	
	flashLight: function() {
		this.toggleFlashlight(); 
		this.toggleFlashlightButton();
	}
};

