var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function() {
        app.servicesBaseUrl = "http://api.theysaidso.com/";
        document.addEventListener("offline", onOffline, false);
        
        function onOffline() {
            navigator.notification.alert("Internet connection is needed by Application", function () {
            }, "Information", "Close");
        }
        
        var kendoApp = new kendo.mobile.Application(document.body);
    });    
}());