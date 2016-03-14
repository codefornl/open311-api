var RequestList = {
    controller: function(){
        this.requests = open311.getRequests();
    },
    view: function(ctrl){
        return ctrl.requests().map(function(data){
            return m.component(Request, data);
        });
    }
};

var Request = {
    controller: function(data){
        this.time = moment(data.requested_datetime).fromNow();
        this.statusicon = (data.status=="closed") ? m("i", {class:"fa fa-check"}) : m("i", {class:"fa fa-bell-o"});
        this.image = (data.media_url !== undefined ) ? m("img", {class: "img", src: data.media_url}) : m("div", {class: "separator"});
    },

    view: function(ctrl, data) {
        return m("div", {class: "request"}, [
            m("p", {class: "type"}, data.service_name),
            m("p", {class: "time"}, [
                m("i", {class:"fa fa-clock-o"}),
                m("span", ctrl.time)
            ]),
            m("p", {class: "loc"}, [
                m("i", {class:"fa fa-map-marker"}),
                m("span", data.address)
            ]),
            ctrl.image,
            m("p", {class: "description"}, data.description),
            m("p", {class: "status"}, [
                ctrl.statusicon,
                m("span", data.status)
            ])
        ]);
    }
};

m.module(document.getElementById("content"), RequestList);
