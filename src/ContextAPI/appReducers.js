 const AppReducer = (state , action) => {
    switch(action.type) {
        case "CHANGE_DARK_MODE": 
            return {
                ...state,
                darkMode:!state.darkMode
            };
        case "SET_USER_DETAILS":
            return {
                ...state,
                userDetails:action.payload 
            };
        case "SET_USER_SIGN_OUT":
            return {
                ...state,
                userDetails:[]
            };   
        case "SET_SEARCH":
            return {
                ...state,
                search:action.payload
            };
        case "SET_WATCH_LATER": 
            return {
                ...state,
                watchLater:[action.payload , ...state.watchLater]
            }
        case "SET_SUBSCRIBES": 
            return {
                ...state,
                subscribes:[action.payload , ...state.subscribes]
            } 
        case "SET_UNSUBSCRIBES": 
            return {
                ...state,
                subscribes:state.subscribes.filter(item => item.id !== action.payload)
            }        
            
        default: return false     
    }
}
export default AppReducer ;