var http = require('http');
var url = require('url');

function start(route, handle){
    function onRequest(request, response){
        // request processing starts
        // To hold post data
        var postData ="";
        // Parsing URl to get pathname
        var pathname = url.parse(request.url).pathname;
        console.log("Request processing for "+pathname);

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk){
            postData += postDataChunk
            console.log("Received POST data chunk" + postDataChunk);
        });

        request.addListener("end", function(){
            route( handle, pathname, response, postData );
        })

    }

    http.createServer(onRequest).listen(process.env.VCAP_APP_PORT);
}

exports.start = start;