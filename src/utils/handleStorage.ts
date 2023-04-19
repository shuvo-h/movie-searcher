const storageName = "favourite_movies"
export const updateFavourite = (id:number,cb:(list:number[])=>void) =>{
    const store =  localStorage.getItem(storageName) ?? "[]";
    let data = JSON.parse(store);
    if (data.includes(id)) {
        data = data.filter((idEl:number)=>idEl !== id);
    }else{
        data = [id,...data];
    }
    localStorage.setItem(storageName,JSON.stringify(data));
    cb(data);
}

export const getFavouriteIds = ():number[] =>{
    const store =  localStorage.getItem(storageName) ?? "[]";
    return JSON.parse(store);
}