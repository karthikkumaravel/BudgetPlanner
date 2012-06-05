function route(handle, pathname, response, postData){
    console.log("about route a request "+pathname);
    if( typeof handle[pathname] === "function" ){
        return handle[pathname](response, postData);
    }else{
        console.log("No handle defined for "+ pathname);
        var data = "404 Not found";
        // Adding header length and content type
        response.writeHead(200, {"Content-Type":"text/plain"});

        // Adding data to reponse
        response.write(data);

        // Response end
        response.end();
    }

}

exports.route = route;