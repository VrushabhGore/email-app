export const create = (userId,token,mail) => {
    console.log(userId,token,mail);
    
    return fetch(`/api/mail/new/${userId}`,{
        method:'post',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body: mail
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
    
};


export const list = (userId,token) =>{
    return fetch(`/api/mail/inbox/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then((response) => {
        console.log('signout',response);
        return response.json()
    }).catch(err => console.log(err));
}

export const list_sent = (userId,token) =>{
    return fetch(`/api/mail/by/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then((response) => {
        console.log('signout',response);
        return response.json()
    }).catch(err => console.log(err));
}

export const remove = (mailId) =>{
    return fetch(`/api/mail/${mailId}`,{
        method:'DELETE',
    }).then((response) => {
        console.log('signout',response);
        return response.json()
    }).catch(err => console.log(err));
}