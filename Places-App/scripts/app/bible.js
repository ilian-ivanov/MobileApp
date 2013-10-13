var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        verse:[],
        types:[{Name:"Verse of the Day"},{Name:"Random"}],
        getCat: getCat,
        selectedCategory: null
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);               
    }
    
    function takeVerse(){        
        var url = ""
        if(selectedCategory == "random"){
             url = "verse.json";   
        }
        else{
            url = "vod.json";
        }
        
        httpRequest.getJSON(app.servicesBaseUrl + "bible/" + url)
        .then(function (verse) {
            console.log(verse)
            
            viewModel.set("verse", cats);    
            app.facebook.init();
        },
        function(response){
            //var responseText= JSON.parse(response.responseText);
            console.log(responseText.error.message);
            //var err = {Name: responseText.error.message};
            //var error = [err];
            //console.log(error);            
            //viewModel.set("categories", error);
        });
    }
    
    function getCat(e) {
        var category = e.sender.element.prop("id");
        selectedCategory = category;        
        console.log(category);
    }
    
    a.bible = {
        init: init,
    };
}(app));