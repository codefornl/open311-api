var RequestList = {
    controller: function(){
        open311.loadRequests();
        this.requests = open311.requests;
    },
    view: function(ctrl){
        return ctrl.requests().map(function(data){
            return m.component(Request, data);
        });
    }
};

var Request = {
    view: function(ctrl, data) {
        var time = moment(data.requested_datetime).fromNow();
        var statusicon = (data.status=="closed") ? m("i", {class:"fa fa-check"}) : m("i", {class:"fa fa-bell-o"});
        //var image = (data.media_url !== undefined ) ? m("img", {class: "img", src: data.media_url}) : m("div", {class: "separator"});
        var image = (data.media_url !== undefined ) ? m("div", {class: "img", style: "background-image:url("+data.media_url+")"}) : m("div", {class: "separator"});

        return m("div", {class: "request"}, [
            m("p", {class: "type"}, data.service_name),
            m("p", {class: "time"}, [
                m("i", {class:"fa fa-clock-o"}),
                m("span", time)
            ]),
            m("p", {class: "loc"}, [
                m("i", {class:"fa fa-map-marker"}),
                m("span", data.address)
            ]),
            image,
            m("p", {class: "description"}, data.description),
            m("p", {class: "status"}, [
                statusicon,
                m("span", data.status)
            ])
        ]);
    }
};

m.module(document.getElementById("content"), RequestList);
