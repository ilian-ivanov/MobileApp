var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function() {
        app.servicesBaseUrl = "http://api.theysaidso.com/";
        document.addEventListener("offline", onOffline, false);
        
        function onOffline() {
            navigator.notification.alert("Internet connection is needed by Application", function () {
            }, "Information", "Close");
        }
        
        //function checkConnection() {
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
           
        if(states[networkState] != 'WiFi connection'){
            navigator.notification.alert('Connection type: ' + states[networkState] + "\r\n Please change to Wi-Fi", function () {
            }, "Information", "Close");
        }
        
        var kendoApp = new kendo.mobile.Application(document.body);
    });    
}());