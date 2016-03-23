var NameTextInput = {
    view: function(){
        return m.component(TextInput, {
            name: "Naam",
            semanticName: "name",
            icon: "user",
            validate: function(v){
                if(v.split(" ").length>1){
                    return {valid: true};
                } else {
                    return {valid: false, hint: "Vul voor én achternaam in."};
                }
            }
        });
    }
};
