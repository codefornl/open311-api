var SubmitForm = {
    view: function(){
        return m("div",{class: "form"},[
            m("h1", "Melding maken"),
            m.component(NameTextInput, open311.first_name),
            m.component(EmailTextInput, open311.email),

            m("hr"),

            m.component(DescriptionInput, open311.description),
            m.component(MediaInput, open311.media),

            m("hr"),

            m("button", {class: "submit", onclick: open311.postRequest}, "Opsturen")
        ]);
    }
};

m.mount(document.getElementById("content"), SubmitForm);
