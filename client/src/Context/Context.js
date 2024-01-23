import { createContext , useEffect, useReducer  } from "react";

const INITIAL_STATE= {
  user:JSON.parse(localStorage.getItem("user"))||null,
  isFetching:false,
  error:null,
}


const ContextReducer = (state,action)=>{
  switch(action.type){
    case"LOGIN_START":
    return{
      user:null,
      isFetching:true,
      error:null,
    }

    case"LOGIN_SUCCESS":
    return{
      user:action.payload,
      isFetching:false,
      error:null,
    }

    case"LOGIN_FAILURE":
    return{
      user:null,
      isFetching:false,
      error:action.payload,
    }

    case"LOGOUT":
    return{
      user:null,
      loading:false,
      error:null
    }


    default:
     return state;
  }

  

}

export const Context= createContext(INITIAL_STATE)


export const ContextProvider = ({children})=>{
  const [state, dispatch]= useReducer(ContextReducer, INITIAL_STATE)

  
  useEffect(()=>{

    localStorage.setItem("user", JSON.stringify(state.user))

  },[state.user])

  return(
    <Context.Provider
     value={{
      user:state.user,
      isFetching:state.isFetching,
      error: state.error,

      dispatch
     }}
    >
      {children}
    </Context.Provider>

  )
}