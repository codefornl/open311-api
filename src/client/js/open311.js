var open311 = (function() {
  var apiEndpoint = "api/v2/";
  var api_key = "56f3b3b5f3348";
  var title = "Meldloket";

  var requests = m.prop([]);
  function loadRequests(){
    m.request({method: "GET", url: apiEndpoint + "requests.json"})
    .then(function(list){
      //sort by date
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
  var service_code = m.prop(-1);
  var latlng = m.prop({
    lat: 0,
    lng: 0
  });
  var description = m.prop("");
  var media = m.prop();

  function postRequest(){
    var formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("service_code", service_code());
    formData.append("email", email());
    formData.append("first_name", first_name());
    var loc = latlng();
    formData.append("lat", loc.lat);
    formData.append("long", loc.lng);
    formData.append("description", description());
    formData.append("media", media());
    m.request({
      method: "POST",
      url: apiEndpoint + "requests.json",
      data: formData,
      serialize: function(value) {
        //simply pass the FormData object intact to the underlying XMLHttpRequest, instead of JSON.stringify'ing it
        return value;
      }
    }).then(function(data) {
      console.log("Post success");
      var myModal = new Modal({
        content: data[0].service_notice
      });
      myModal.open();
      console.log(data);
    }, function(error) {
      console.log(error);
    });
  }

  var serviceList = m.prop([]);
  function loadServiceList() {
    m.request({method: "GET", url: apiEndpoint+"services.json"}).then(serviceList);
  }

  return {
    requests: requests,
    loadRequests: loadRequests,
    first_name: first_name,
    service_code: service_code,
    email: email,
    latlng: latlng,
    description: description,
    media: media,
    postRequest: postRequest,
    serviceList: serviceList,
    loadServiceList: loadServiceList
  };
})();
