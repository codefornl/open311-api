/*Generic input box
    args:
    {
        name: string //name of input, label
        semanticName: string //name for autocomplete
        icon: string //font-awesome icon name
        vaildate: function //callback function to validate input value
        value: function //callback on change
    }
*/

var TextInput = {
    controller: function(args){

        this.name = args.name;
        this.semanticName = args.semanticName;
        this.icon = args.icon;
        this.validate = args.validate;
        this.value = args.value;

        this.isValid = {
            valid: undefined,
            hint: ""
        };

        this.onChange = function(e){
            this.value(e.target.value);
            this.isValid = this.validate(this.value());
        };
    },

    view: function(ctrl){
        return m("div", [
            m.component(InputLabel, {name: ctrl.name, icon: ctrl.icon}),
            m("input", {value: ctrl.value(),onchange: ctrl.onChange.bind(ctrl), class: "input", name:ctrl.semanticName, placeholder: self.name}),
            m.component(InputCheckmark, {status: ctrl.isValid.valid}),
            m("div", {class: "hint"}, (ctrl.isValid.valid===false) ? ctrl.isValid.hint : "")
        ]);
    }
};
