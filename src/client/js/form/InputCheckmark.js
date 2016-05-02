/*Displays a check if valid input and cross if invald
    args:
    {
        status: string // true, false or undefined
    }
*/
var InputCheckmark = {
    view: function(ctrl, args){
        if(args.status === true){
            return m("i", {class:"fa after fa-check"});
        } else if(args.status === false) {
            return m("i", {class:"fa after fa-times"});
        }
        return(m("i",""));
    }
};
