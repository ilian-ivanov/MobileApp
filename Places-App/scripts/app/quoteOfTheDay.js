var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        quote:[]
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        httpRequest.getJSON(app.servicesBaseUrl + "qod.json")
        .then(function (response) {
            var quoteOfTheDay = [response.contents];
            viewModel.set("quote", quoteOfTheDay);    
        },
        function(response){
            var responseText= JSON.parse(response.responseText);
            console.log(responseText.error.message);
            var err = {quote: responseText.error.message, author:false};
            var error = [err];
            console.log(error);            
            viewModel.set("quote", error);   
        });        
    }
    
    a.theQuote = {
        init:init,
    };
}(app));