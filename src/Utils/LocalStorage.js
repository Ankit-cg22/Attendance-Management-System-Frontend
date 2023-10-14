export function storeWithTTL(key , val , ttlInSeconds){
    const now = new Date().getTime();
    const expirationTime = now + ttlInSeconds * 1000 ;

    const data = {
        val : val , 
        expirationTime : expirationTime
    }

    const JSONdata = JSON.stringify(data);

    localStorage.setItem(key  , JSONdata);

}

export function getDataWithTTL(key) {
    const storedData = localStorage.getItem(key)

    if(storedData){
        const data = JSON.parse(storedData)
        const now = new Date().getTime()
        if(data.expirationTime && data.expirationTime < now) {
            // if there is an expiration time and it is < now , then this data is expired 
            
            //delete the data 
            localStorage.removeItem(key)

            return null
        }
        else {
            // data is valid 
            return data.val
        }
    }

    // no data present with this key
    return null 
}