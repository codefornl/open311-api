var EmailTextInput = {
    view: function(ctrl, email){
        return m.component(TextInput, {
            name: "Email",
            semanticName: "email",
            icon: "envelope",
            validate: function(v){
                var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                if(re.test(v)){
                    return {valid: true};
                } else {
                    return {valid: false, hint: "Vul een geldig email adres in."};
                }
            },
            value: email
        });
    }
};
