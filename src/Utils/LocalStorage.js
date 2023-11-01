import axios from "axios";
import { BACKEND_URL } from "./Costansts";

export function storeWithTTL(key , val , ttlInSeconds){
    const now = new Date().getTime();
    const expirationTime = now + ttlInSeconds * 1000 ;
    const refreshTokenExpirationTime = now + 24 * 60 * 60 * 1000;
    const data = {
        val : val , 
        expirationTime : expirationTime,
        refreshTokenExpirationTime: refreshTokenExpirationTime
    }

    const JSONdata = JSON.stringify(data);

    localStorage.setItem(key  , JSONdata);

}

export function getDataWithTTL(key) {
    const storedData = localStorage.getItem(key)

    if(storedData){
        const data = JSON.parse(storedData)
        const now = new Date().getTime()
        if(data.expirationTime && (data.expirationTime < now) && (data.refreshTokenExpirationTime>now)) {
            // if there is an expiration time and it is < now , then this data is expired 

            axios.post(`${BACKEND_URL}/api/user/refreshToken`, {refreshToken : data.val.refreshToken})
            .then(res => {
                const data = res.data;
                storeWithTTL("data" , data , 24 * 60 * 60);
                return data;
            })
            .catch(err=>{
                //delete the data 
                localStorage.removeItem(key)
                return null
            })
            
            
        }
        else {
            // data is valid 
            return data.val
        }
    }

    // no data present with this key
    return null 
}