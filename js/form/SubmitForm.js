var FormModel = (function() {
    //form values
    var name = m.prop();
    var email = m.prop();
    var description = m.prop();
    var media = m.prop();
    var service = m.prop();

    return {
        name: name,
        email: email,
        description: description,
        media: media,
        service: service
    };
})();


var SubmitForm = {
    view: function(){
        return m("div",{class: "form"},[
            m("h1", "Melding maken"),
            m.component(NameTextInput),
            m.component(EmailTextInput),

            m("hr"),

            m.component(DescriptionInput),
            m.component(MediaInput),

            m("hr"),

            m("button", {class: "submit"}, "Opsturen")
        ]);
    }
};

m.mount(document.getElementById("content"), SubmitForm);
