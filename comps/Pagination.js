


export const Pagination =  ( {postsPerPage,TotalPosts,paginate,currentpage}) => {
    const pageNumber=[];

    for(let i=1;i<=Math.ceil(TotalPosts/postsPerPage);i++){
        pageNumber.push(i);
    }
    
    return (
       <div >
           <span> {'<<<<'} </span>
           <ul className='pagination' style={{  display:'flex',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    paddingBottom: 10,
    margin:'0 30px',
    scrollbarWidth: 'none'}} >
               
             {pageNumber.map(
                   (number)=><li key={number} onClick={()=>paginate(number)} style={number===currentpage?{cursor:'pointer',border:'2px red solid',borderRadius:4,padding:'2px 5px',color:'white',fontSize:10,fontWeight:'bold',backgroundColor:'green'}:{cursor:'pointer',listStyle:'none',margin:'0 3px',border:'2px red solid',borderRadius:4,padding:'2px 5px',fontSize:10,fontWeight:'bold'}}>
                        <a >
                            {number}
                        </a>
                   </li>
               )}

           </ul>
           
           <span> {'>>>>'} </span>
       </div>
     )
}
