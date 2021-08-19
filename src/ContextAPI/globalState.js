import {createContext  , useReducer , useContext, useEffect} from 'react';
import AppReducer from './appReducers';

// initialState 
const initialState = {
    darkMode:JSON.parse(localStorage.getItem('darkMode'))  ,
    userDetails:[],
    search:'',
    watchLater:JSON.parse(localStorage.getItem('watchLater')) || [],
    subscribes:JSON.parse(localStorage.getItem('subscribes')) || [],
}

//create context 
export const GlobalContext  = createContext(initialState);

// useStateValue
export const useStateValue = () => useContext(GlobalContext);


// global Provider 
const GlobalProvider = ({children}) => {
    const [state , dispatch] = useReducer(AppReducer , initialState );

    useEffect(() => {
        localStorage.setItem('darkMode' , JSON.stringify(state.darkMode));
        localStorage.setItem('watchLater' , JSON.stringify(state.watchLater));
        localStorage.setItem('subscribes' , JSON.stringify(state.subscribes));
    })

    // function change dark mode  
    const changeDarkMode = () => {
        dispatch({
           type:"CHANGE_DARK_MODE" 
        })
    }

    // functions Auth
    const setUserDetails = (user) => {
        dispatch({
            type:"SET_USER_DETAILS",
            payload:user
        })
    }

    const setUserSignOut = (user) => {
        dispatch({
            type:"SET_USER_SIGN_OUT",
        })
    }

    // setSearch function 
    const setSearch= (item) => {
        dispatch({
            type:"SET_SEARCH",
            payload:item
        })
    }


    // function watch late 
    const setWatchLater = (item) => {
        dispatch({
            type:"SET_WATCH_LATER",
            payload:item
        })
    }

     // function subscribes
     const setSubscribes = (item) => {
        dispatch({
            type:"SET_SUBSCRIBES",
            payload:item
        })
    }

    const untSubscribes = (item) => {
        dispatch({
            type:"SET_UNSUBSCRIBES",
            payload:item
        })
    }


    return (
        <GlobalContext.Provider value={{
            darkMode:state.darkMode , 
            userDetails:state.userDetails , 
            search:state.search , 
            watchLater:state.watchLater , 
            subscribes:state.subscribes , 
            changeDarkMode,
            setUserDetails,
            setUserSignOut,
            setSearch,
            setWatchLater,
            setSubscribes,
            untSubscribes
            
            }}>
                {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider 
