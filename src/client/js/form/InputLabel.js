var InputLabel = {
  view: function(ctrl, args){
    return m("label", [
      m("i", {class:"fa fa-"+args.icon}),
      m("span", args.name)
    ]);
  }
};
