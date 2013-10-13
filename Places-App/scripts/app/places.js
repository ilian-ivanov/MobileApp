var app = app || {};

(function(a) {
    function getAlphabetically() {
        httpRequest.getJSON("http://api.theysaidso.com/bible/vod.json")
        .then(function(places) {
            console.log(places);
            var quote = [places.contents];
            viewModel.set("places", quote); 
            console.log(places);
        });
    }
    
    function getByLocation() {
        cordovaExt.getLocation().
        then(function(location) {
            var locationString = location.coords.latitude + "," + location.coords.longitude;            
            return httpRequest.getJSON(app.servicesBaseUrl  + "places?location=" + locationString);     
        })
        .then(function(places) {
            viewModel.set("places", places); 
            console.log(places);
        });
    }
    
    var viewModel = kendo.observable({
        places:[],
        getAlphabetically: getAlphabetically,
        getByLocation: getByLocation
    });
    
    function init(e) {
        debugger;
        kendo.bind(e.view.element, viewModel);
        getAlphabetically();
    }   
    
    a.places = {
        init:init          
    };
}(app));