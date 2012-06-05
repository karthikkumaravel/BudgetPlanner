var querystring = require("querystring");
function start(response){
    console.log(" Request handler start function is called ");
        // Adding header to the response
        var data = "<form action='/stop'method='post'> <input type='text' name='myname' /> <input type='submit' name='name' value='submit' />  </form>";

        // Adding header length and content type
        response.writeHead(200, {"Content-Type":"text/html"});

        // Adding data to reponse
        response.write(data);

        // Response end
        response.end();
}

function stop(response, postData){
    console.log(" Request handler setting function is called ");

    var data =  "Bye bye take care  " + querystring.parse(postData).myname;

    // Adding header length and content type
    response.writeHead(200, {"Content-Type":"text/plain"});

    // Adding data to reponse
    response.write(data);

    // Response end
    response.end();
}

exports.start = start
exports.stop = stop;