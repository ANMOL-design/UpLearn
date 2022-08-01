import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdLibraryAdd, MdRemoveRedEye, MdSimCardDownload } from "react-icons/md";


function LibraryHome(props){
   
    const [product, setproduct] = useState([]);
  const [UserInfo,setUserInfo]= useState([])
 
    const [currentPage, setcurrentPage] = useState(0);
    const [productPerPage, setproductPerPage] = useState(8);
    const [backup, setbackup] = useState([]);

    console.log(props)
    const [start, setstart] = useState(0);
    const [end, setend] = useState(16);
  
    useEffect(() => {
        const fetchdata = async () =>{
            const {data} = await axios.get("/librarybooks");
            setproduct(data);
            setbackup(data);
        }
        fetchdata();   

        const HandleTheSearch = (value) => {
            var ans = backup.map((a) => {
                if(a.Name.search(value) > -1){
                    return a
                }
            });
    
            ans = ans.filter((e) => e !== undefined)
            
            console.log( ans)
            setproduct(ans);
        }

        // Filter Out cards on component Mount 
        if(props.inputbook !== ''){
            setproduct(backup)
            HandleTheSearch(props.inputbook)  
        }
        
    }, [])

    const LoadLessBooks = () => {
        if(start > 0){
            setstart(start - 16);
            setend(end - 16);
            window.scroll(0, 830);
        }
        else{
            document.getElementById('replyprob').innerHTML = 'Invalid Move.'
        }
    }
    const LoadMoreBooks = () => {
        if(end < product.length){
            setstart(start + 16);
            setend(end + 16);
            window.scroll(0, 830);
        }
        else{
            document.getElementById('replyprob').innerHTML = 'No more Books Available.'
        }
    }
   
    const AddtoLibrary = async (e)=>{

      const BookId = e.target.value;
      const UserId = props.id

      await fetch("/addtolibrary", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        
        body: JSON.stringify({
          BookId,
          UserId
        }),

      })
      .then((Response)=>{

        if(Response.status === 200){
            window.alert("Book Added Succesfully to Dashboard.")
        }
        else{
            window.alert("Error Ocured! Try again later.")
        }
      })
      .catch((err)=>{
        window.alert("Error Ocured! Try again later.")
      })
       
    }

    return(
        <>
            <div className="library_products_heading ">
                <h1>BEST BOOKS</h1>
            </div>
            {/* Details of Product  */}
            <div className="home-products-details">
                {product.slice(start,end).map( (item) => {
                    return(
                        <div key={item._id} className={"card"} style={{width: "17.5rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                    <img src={item.BookImage} className="home-product-image" alt="Products" />
                                    {/* Hot Icon On Card  */}
                                    <div className="Hotproducts">
                                        {item.bookSubject}
                                    </div>
                                    {/* OverLay Property of card  */}
                        
                                        <div className="overlay">
                                            <div className="overlay-img">
                                                 <Link to={"/uplearnLibrary-preview/"+item._id}  className="overlay-img-space"><MdRemoveRedEye/> Preview</Link><br />
                                              <a href={item.BookPdf}  target='_blank' rel="noreferrer noopener" className="overlay-img-space" ><MdSimCardDownload/> Download</a>
                                            </div>
                                        </div> 
                             </div>
                             {/* Lower Body Portion of card  */}
                                   
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                {/* Product Price in Body  */}
                                <p className="card-text">{item.bookName}</p>
                                <h5 className="fade-title-header"> by {item.AuthorName}</h5>  

                                {(props.user.MyLibrary === item._id)}
                                <button className="lib-card-button" value={item._id} onClick={AddtoLibrary}>
                                    <MdLibraryAdd/> Add To Library
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

     
            {product.length > 0 ? 
                <div className="pagination" id="load"> 
                    <div>
                        <p>
                            Load more books by click next.
                        </p>
                        <p className="invalid" id='replyprob'></p>
                    </div>

                    <span onClick={LoadLessBooks}>&lt; Previous</span> 
                    <span onClick={LoadMoreBooks}>Next &gt;</span> 
                </div>
                : 
                null
            } 
        </>
    )
}

export default LibraryHome;