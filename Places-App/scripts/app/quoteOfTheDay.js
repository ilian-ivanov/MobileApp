var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        quote:[]
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        //window.localStorage.clear();
        var value = window.localStorage.getItem('quote');
        //console.log('before')
        if(value != null){
            //console.log(value + "------------------");
            viewModel.set("quote", JSON.parse(value));
        }
        else{
            httpRequest.getJSON(app.servicesBaseUrl + "qod.json")
            .then(function (response) {
                var quoteOfTheDay = [response.contents];
                window.localStorage.setItem("quote", JSON.stringify(quoteOfTheDay));
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
    }
    
    a.theQuote = {
        init:init,
    };
}(app));