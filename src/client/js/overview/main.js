var Overview = {
  controller: function(){
    open311.loadRequests();
    this.requests = open311.requests;
  },
  view: function(ctrl){
    return ctrl.requests().map(function(data){
      return m.component(Entry, data);
    });
  }
};

var Entry = {
  view: function(ctrl, data) {
    var time = moment(data.requested_datetime).fromNow();
    var statusicon = (data.status=="closed") ? m("i", {class:"fa fa-check"}) : m("i", {class:"fa fa-bell-o"});
    var image = (data.media_url !== undefined ) ?
      m("div", {class: "img", style: "background-image:url("+data.media_url+")"}) :
      m("div", {class: "separator"});

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

var Menu = {
  view: function(){
    return m("div", {id: "topbar"}, [
        m("span", {class: "title"}, "Meldloket"),
        m("span", {class: "menu"}, [
            m("ul", {class:"list-inline"},[
              m("li",
                m("div",{class:"btn-round"},
                  m("span",{class:"item"},
                    m("a",{href: "#",title: "Home", alt: "home"},
                      m("i",{class: "fa fa-home", "aria-hidden": true})
                    )
                  )
                )
              ),
              m("li",
                m("div",{class:"btn-round"},
                  m("span",{class:"item"},
                    m("a",{href: "#add",title: "Add", alt: "add"},
                      m("i",{class: "fa fa-plus", "aria-hidden": true})
                    )
                  )
                )
              ),
              m("li",
                m("div",{class:"btn-round"},
                  m("span",{class:"item"},
                    m("a",{href: "#login",title: "Sign in", alt: "sign-in"},
                      m("i",{class: "fa fa-sign-in", "aria-hidden": true})
                    )
                  )
                )
              )
            ])
        ])
    ]);
  }
};
var Add = {
  view: function(){
    return m("div",{class: "form"},[
      m("h1", "Melding maken"),
      m.component(NameTextInput, open311.first_name),
      m.component(EmailTextInput, open311.email),

      m("hr"),

      m.component(DescriptionInput, open311.description),
      m.component(MediaInput, open311.media),
      m.component(ServiceSelector, open311.serviceList, open311.loadServiceList),

      m("hr"),

      m("button", {class: "submit", onclick: open311.postRequest}, "Opsturen")
    ]);
  }
};

var Login = {
  view: function(){
    return m("div",{class: "form"}, m("h1", "Login here"));
  }
};

m.render(document.getElementById("top"), Menu);
m.route.mode = 'hash';
m.route(document.getElementById("content"), "", {
    "": Overview,
    "add": Add,
    "login": Login
});

//m.module(document.getElementById("content"), RequestList);
