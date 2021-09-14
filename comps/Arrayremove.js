const arrayRemove=(data=[],element)=>{    
    var r=data;
   var  index=r.indexOf(element)
    if(index>-1){
     r.splice(index,1)
        }
    return r
}

export default arrayRemove;
  