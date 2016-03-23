var DescriptionInput = {
    controller: function(args){

    },
    view: function(ctrl){
        return m("div", [
            m.component(InputLabel, {name: "Omschrijving", icon: "pencil"}),
            m("textarea", {class: "input"})
        ]);
    }
};
