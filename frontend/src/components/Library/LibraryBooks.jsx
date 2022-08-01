import React, {useState} from "react";
import { MdSimCardDownload } from "react-icons/md";

function LibraryHome(props){
   
    const product =  props.data;

    console.log(props, product)
    const [start, setstart] = useState(0);
    const [end, setend] = useState(8);
  
    const LoadLessBooks = () => {
        if(start > 0){
            setstart(start - 8);
            setend(end - 8);
            window.scroll(0, 800);
        }
        else{
            document.getElementById('replyprob').innerHTML = 'Invalid Move.'
        }
    }
    const LoadMoreBooks = () => {
        if(end < product.length){
            setstart(start + 8);
            setend(end + 8);
            window.scroll(0, 800);
        }
        else{
            document.getElementById('replyprob').innerHTML = 'No more Books Available.'
        }
    }

    return(
        <>
            <div className="library_products_heading ">
                <h1>BEST BOOKS</h1>
                <p>Total Books Available: {product.length}</p>
            </div>
            {
                product.length > 0 ? 
                null :
                <div  style={{height: "40vh", fontSize: "2rem", color: "#c0c0c0", textAlign: 'center', verticalAlign: 'middle'}}>
                        No data Found ...
                </div>
            }
            {/* Details of Product  */}
            <div className="home-products-details">
                {product.slice( start, end).map( (item) => {
                    return(
                        <div key={item._id} className={"card"} style={{width: "17.5rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.BookImage} className="home-product-image" alt="Products" />
                                    
                                {/* Hot Icon On Card  */}
                                <div className="Hotproducts">
                                    {item.bookSubject}
                                </div>
                            </div>
                                   
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                {/* Product Price in Body  */}
                                <p className="card-text">{item.bookName}</p>
                                <h5 className="fade-title-header"> by {item.AuthorName}</h5>  

                                <a href={item.BookPdf}  target='_blank' rel="noreferrer noopener" className="downloadpdf">
                                    <button className="lib-card-button">
                                        <MdSimCardDownload/>&nbsp; Download
                                    </button>
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>

     
            {product.length > 0 ? 
                <div className="pagination" id="load"> 
                    <div>
                        <span onClick={LoadLessBooks}> Previous</span> 
                        <span onClick={LoadMoreBooks}>Next </span> 
                    </div>
 
                    <p>Load more books by click next.</p>
                    <p className="invalid" id='replyprob'></p>
                </div>
                : 
                null
            } 
        </>
    )
}

export default LibraryHome;