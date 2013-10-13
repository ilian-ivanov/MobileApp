var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        categories:[],
        selectedCategory:null,
        getCategory:getCategory,
        quote: []
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        httpRequest.getJSON(app.servicesBaseUrl + "qod/categories.json")
        .then(function (categories) {
            var cat = categories.contents.categories;
            var cats = [];
            for(c in cat)
            {
                var obj = {Name: c};
                cats.push(obj);  
            }
            
            viewModel.set("categories", cats);    
            app.facebook.init();
        },
        function(response){
            var responseText= JSON.parse(response.responseText);
            console.log(responseText.error.message);
            var err = {Name: responseText.error.message};
            var error = [err];
            console.log(error);            
            viewModel.set("categories", error);
        });        
    }
    
    function quote(){
        httpRequest.getJSON(app.servicesBaseUrl + "qod.json?category=" + selectedCategory)
        .then(function(quote) {
            quote = quote.contents;
            quote.category = selectedCategory;
            var newQuote = [quote];
            viewModel.set("quote", newQuote);
        });
    }
    
    function getCategory(e) {
        var category = e.sender.element.prop("id");
        selectedCategory = category;        
    }
    
    a.categories = {
        init:init,
        quote: quote
    };
}(app));