var app = app || {};

(function(a) {
    //Initialization (e.g. in the model-view init method)

    
    function init()
    {
     var inAppBrowserRef;
            var debug = true;
            //debugger;
            jso_registerRedirectHandler(function(url) {
                debugger;
                inAppBrowserRef = window.open(url, "_blank");
                inAppBrowserRef.addEventListener('loadstop', function(e) {
                    LocationChange(e.url)
                }, false);
            });
            
            function LocationChange(url) {
                url = decodeURIComponent(url);

                jso_checkfortoken('facebook', url, function() {
                    inAppBrowserRef.close();
                });
            };

            /*
            * Configure the OAuth providers to use.
            */
            jso_configure({
                "facebook": {
                    client_id: "1404823266416277", //->your client_id goes here!!!
                    redirect_uri: "http://www.facebook.com/connect/login_success.html",
                    authorization: "https://www.facebook.com/dialog/oauth",
                    presenttoken: "qs"
                }
            }, {"debug": debug});
        
            // jso_dump displays a list of cached tokens using outputlog if debugging is enabled.
            jso_dump();
        }

///on share btn click
function makefbPost(FBmessage) {  
    //debugger;
    $.oajax({
        type: "POST",
        url: "https://graph.facebook.com/me/feed",
        jso_provider: "facebook",
        jso_scopes: ["read_stream", "publish_stream", "publish_actions"],
        jso_allowia: true,
        dataType: 'json',
        data: {
            message: FBmessage,
        },
        success: function (responseData) {
            navigator.notification.alert("Status is posted in your Facebook wall.", function () {
            }, "Congratulations!", "Done");
        },
        error: function (errorData) {
            navigator.notification.alert("Error encountered. Details:" + errorData.message, function () {
            }, "Error", "Done");
        }
    });
}
    
    a.facebook = {
        init:init,
        makefbPost: makefbPost
    };
}(app));