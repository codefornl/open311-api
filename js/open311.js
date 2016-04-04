var open311 = (function(){

    var apiEndpoint = "http://eindhoven.meldloket.nl/crm/open311/v2/";
    var api_key = "56f3b3b5f3348";

    var requests = m.prop([]);
    function loadRequests(){
        m.request({method: "GET", url: apiEndpoint+"requests.json"})
            //sort by date
            .then(function(list){
                return list.sort(function(a,b){
                    a = new Date(a.requested_datetime);
                    b = new Date(b.requested_datetime);
                    return (b - a);
                });
            })
            .then(requests);
    }

    var first_name = m.prop("");
    var email = m.prop("");
    var lat = m.prop("");
    var long = m.prop("");
    var description = m.prop("");
    var media = m.prop();

    function postRequest(){
        var formData = new FormData();

        formData.append("api_key", api_key);
        formData.append("service_code", "1");

        formData.append("email", email);
        formData.append("first_name", name);

        formData.append("lat", "51.42017745971680");
        formData.append("long", "5.47374010086060");

        formData.append("description", description());
        formData.append("media", media());

        m.request({
            method: "POST",
            url: apiEndpoint+"requests.json",
            data: formData,
            serialize: function(value) {return value;} //simply pass the FormData object intact to the underlying XMLHttpRequest, instead of JSON.stringify'ing it
        });
    }

    return {
        requests: requests,
        loadRequests: loadRequests,

        first_name: first_name,
        email: email,
        lat: lat,
        long: long,
        description: description,
        media: media,

        postRequest: postRequest
    };
})();
