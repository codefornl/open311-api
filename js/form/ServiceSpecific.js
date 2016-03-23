/*Service Specific
*/

var ServiceSpecific = {
    controller: function(args){
        this.service = args();
    },

    view: function(ctrl){
        console.log(ctrl.service());
        if(ctrl.service()){
            return m("div", ctrl.service().attributes.map(function(attrib){
                return m("div", attrib.description);
            }));
        } else {
            return m("div");
        }
    }
};
