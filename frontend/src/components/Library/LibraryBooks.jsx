import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdLibraryAdd, MdRemoveRedEye, MdSimCardDownload } from "react-icons/md";


function LibraryHome(){

    const [product, setproduct] = useState([]);

    const [currentPage, setcurrentPage] = useState(0);
    const [productPerPage, setproductPerPage] = useState(8);
  
    useEffect(() => {
        const fetchdata = async () =>{
            const {data} = await axios.get("/librarybooks");
            setproduct(data);
        }
        fetchdata();
    }, [])

    const ProductItemShowDisplay1 = () => {
        setcurrentPage(0)
        setproductPerPage(8);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay2 = () => {
        setcurrentPage(8)
        setproductPerPage(16);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay3 = () => {
        setcurrentPage(16)
        setproductPerPage(24);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay4 = () => {
        setcurrentPage(24)
        setproductPerPage(32);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay5 = () => {
        setcurrentPage(32)
        setproductPerPage(40);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay6 = () => {
        setcurrentPage(40)
        setproductPerPage(48);
        window.scroll(0, 200)
    }

    const AddtoLibrary = async(e)=>{
      const BookId = e.target.value;
      await fetch("/addtoLibrary", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        
        body: JSON.stringify({
          BookId
        }),
      }).then((Response)=>{
        if(Response.status==200){
            window.alert("Book Added Succesfully to Library")
        }
        else{
            window.alert("Error Ocured! Try again later.")
        }
      }).catch((Error)=>{
        window.alert("Error Ocured! Try again later.")
      })
    }

    return(
        <>
          <div className="home_products_sell">
                <h1 className="mb-3">BEST Books</h1>
          </div>
          {/* Details of Product  */}
          <div className="home-products-details container-fluid">
                {product.slice(currentPage,productPerPage).map( (item) => {
                    return(
                        <div key={item._id} className={"card "} id="pc" style={{width: "17.5rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.BookImage} className="card-img-top home-product-image" alt="Products" />
                                    {/* Hot Icon On Card  */}
                                    <div className="Hotproducts">
                                      {item.bookSubject}
                                    </div>
                                    {/* OverLay Property of card  */}
                        
                                        <div className="overlay">
                                            <div className="overlay-img">
                                                <Link to={ "/products/" + item._id }> <span className="overlay-img-space"><MdRemoveRedEye/> Preview</span> </Link><br />
                                                <Link to={"/cart/" + item._id + "?qty=1"}><span className="overlay-img-space"><MdSimCardDownload/> Download</span></Link>
                                            </div>
                                        </div> 
                             </div>
                             {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                    {/* Product Price in Body  */}
                                    <p className="card-text">{item.bookName}</p>
                                    <h5 className="card-title fade-title-header"> by {item.AuthorName}</h5>   
                            </div>
                            <button className="lib-card-button" value={item._id} onClick={AddtoLibrary}>
                                <MdLibraryAdd/> Add To Library
                            </button>
                        </div>
                    )
                })}
          </div>

     
            {product.length > 0 ? 
                <div className="product-load-more-container-brand" id="load"> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay1}>1</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay2}>2</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay3}>3</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay4}>4</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay5}>5</span> 
                    <span className="dis-btn-brand" onClick={ProductItemShowDisplay6}>6</span> 
                </div>
                : 
                null
            } 
        </>
    )
}

export default LibraryHome;