export var AuthReducer = function(state = {isloggedin:localStorage.token && true, username: localStorage.name || "new user"}, action){
    switch(action.type){
        case "LOGIN": {
            state = {...state} // backup le lia obj ka
            // state["isloggedin"] = true
            state.isloggedin = true
            state.username = (localStorage.token ? localStorage.name : "new user")
            return state
        }
        default: return state
    }
}