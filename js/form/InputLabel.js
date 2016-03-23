var InputLabel = {
    view: function(ctrl, args){
        return m("div", {class:"label"}, [
            m("i", {class:"fa fa-"+args.icon}),
            m("span", args.name)
        ])
    }
};
