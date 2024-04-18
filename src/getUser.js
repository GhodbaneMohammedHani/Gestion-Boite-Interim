import { jwtDecode } from "jwt-decode";
export const getUser=()=>{
    const user=JSON.parse(JSON.stringify(localStorage.getItem('user')));
    const {id,role}=jwtDecode(user);
    return {id,role};
}