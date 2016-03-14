var open311 = (function(){

    var apiEndpoint = "http://eindhoven.meldloket.nl/crm/open311/v2/";

    function getRequests(){
        return m.request({method: "GET", dataType: "jsonp", url: apiEndpoint+"requests.json"});
    }

    return {
        getRequests: getRequests
    };
})();
