const AUTH_KEY="user_session";

export const login=(user)=>{

    localStorage.setItem(AUTH_KEY,JSON.stringify(user))
}
export const logout=()=>{
    localStorage.removeItem(AUTH_KEY);
}

export const getUser=()=>{
    let data=localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) :null;
}

export const isAuthenticated=()=>{
 return !!getUser();
}