var DescriptionInput = {
    controller: function(description){
        this.description = description;
        this.update = function(e){
            this.description(e.target.value);
        };
    },
    view: function(ctrl){
        return m("div", [
            m.component(InputLabel, {name: "Omschrijving", icon: "pencil"}),
            m("textarea", {onchange: ctrl.update.bind(ctrl), value: ctrl.description(), class: "input"})
        ]);
    }
};
