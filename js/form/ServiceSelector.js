/*Select Open311 service
    args: open311 services.json
*/

var ServiceSelector = {
    controller: function(args){
        this.serviceList = m.prop();
        args.serviceList().then(function(l){
            l.unshift({service_name:"---", service_code: "-1"});
            return l;
        }).then(this.serviceList);
        //console.log(this.serviceList());
        //this.serviceList = this.serviceList().unshift({service_name:"---", service_code: "-1"});

        this.update = function(e){
            args.selected(e.target.value);
        };
    },
    view: function(ctrl){
        return m("div", [
            m.component(InputLabel, {name: "Service", icon: "tags"}),
            m("select", {onchange: ctrl.update, class: "input"}, ctrl.serviceList().map(function(option){
                return m("option", {value: option.service_code}, option.service_name);
            }))
        ]);
    }
};
