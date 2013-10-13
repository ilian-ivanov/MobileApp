var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function() {
        app.servicesBaseUrl = "http://api.theysaidso.com/";
        
        var kendoApp = new kendo.mobile.Application(document.body);
    });    
}());