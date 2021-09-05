
export const Pagination =  ( {postsPerPage,TotalPosts,paginate,currentpage}) => {
    const pageNumber=[];

    for(let i=1;i<=Math.ceil(TotalPosts/postsPerPage);i++){
        pageNumber.push(i);
    }
    
    return (

       <div style={{border:'1px solid gray',paddingLeft:20,textAlign:'center'}}>
           <ul className='pagination' style={{display:'flex',flexWrap:'wrap',maxWidth:'90vw',justifyContent:'center'}}>
               
             {pageNumber.map(
                   (number)=><li key={number} onClick={()=>paginate(number)} style={number===currentpage?{cursor:'pointer',listStyle:'none',margin:'3px 4px',position:'relative',right:30,border:'2px red solid',borderRadius:4,padding:'2px 5px',color:'white',fontSize:10,fontWeight:'bold',backgroundColor:'green'}:{cursor:'pointer',listStyle:'none',margin:'3px 4px',position:'relative',right:30,border:'2px red solid',borderRadius:4,padding:'2px 5px',fontSize:10,fontWeight:'bold'}}>
                        <a >
                            {number}
                        </a>
                   </li>
               )}

           </ul>
       </div>
        )
}
