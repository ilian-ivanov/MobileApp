var app = app || {};

(function(a) {
    function init() {
                 
        var viewModel = kendo.observable({
            message:""
        });
        kendo.bind($("#view"), viewModel); 
        
        var head = $("#input-for-face").val();
        if(head.length < 10){
            viewModel.set("message", "Please enter atleast 10 symbols!");
            //$("#error-for-input").html("Please enter atleast 10 symbols!");
        }
        else if(head.length > 200){
            viewModel.set("message", "Maximum symbols are 200, but you are entered " + head.length + ".");
            //$("#error-for-input").html("Maximum symbols are 200, but you are entered " + head.length + ".");
        }
        else{
            app.facebook.init();
            app.facebook.makefbPost(head);  
            closeModalView()
        }
    };
    
    function closeModalView(e) {
        $("#input-for-face").val("");
        $("#share-thought").kendoMobileModalView("close");
    }
    
    a.share = {
        init:init,
        closeModalView:closeModalView
    };
}(app));