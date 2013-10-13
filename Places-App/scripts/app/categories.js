var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        categories:[],
        selectedCategory:null,
        getQuoteOfTheDay:getQuoteOfTheDay,
        quote: []
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        //httpRequest.getJSON("http://localhost:62354/api/" + "categories")
        httpRequest.getJSON("http://api.theysaidso.com/qod/categories.json")
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
        });        
    }
    
    function quote(){
        //debugger;
        //console.log(selectedCategory)
        httpRequest.getJSON("http://api.theysaidso.com/qod.json?category=" + selectedCategory)
        .then(function(quote) {
            //console.log(quote);
            quote = quote.contents;
            quote.category = selectedCategory;
            var newQuote = [quote];
            viewModel.set("quote", newQuote);
            //debugger;
            //console.log(newQuote);
        });
    }
    
    function getQuoteOfTheDay(e) {
        //console.log(e.sender.element.prop("id"));
        var category = e.sender.element.prop("id");
        selectedCategory = category;        
    }
    
    a.categories = {
        init:init,
        quote: quote
    };
}(app));