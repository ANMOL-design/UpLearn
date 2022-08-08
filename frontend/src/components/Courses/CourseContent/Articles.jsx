import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { MdArticle } from "react-icons/md";
export default function ArticleContent(props){
   const {id} =useParams();
   const CourseArticle = props.course;
   console.log(CourseArticle);
   let courseArticlecontent = [];
   if(CourseArticle.courseArticles){
    courseArticlecontent= CourseArticle.courseArticles;
    console.log(courseArticlecontent);
    let i=0
    let isDisplay = false;
   const handleArticleClick=(item)=>{
    isDisplay =!isDisplay;
  
    console.log(item);
    let Articlecontent=""
    if(item.ArticleContent){
        if(isDisplay){
        Articlecontent =item.ArticleContent;
        
         
        document.getElementById("article-display-cotainer"+item._id).style.display ="block";
        document.getElementById("article-display-cotainer"+item._id).innerHTML = Articlecontent
        }
        else{
            document.getElementById("article-display-cotainer"+item._id).style.display ="none";
        }
    }
    return(
        <>
       
        </>
    )
   }
    return(
        <div id="article-content-container" className="article-content-container">
            <ul>
             {courseArticlecontent.map((item)=>(
                <>
               <li onClick={()=>handleArticleClick(item)}>{"1."+ ++i +" "+item.ArticleTitle} <span><MdArticle/></span>
               </li> 
                 <div className="articleDisplaycontainer" id={"article-display-cotainer"+item._id}></div>
              
                </>
             ))}
             </ul>
        </div>
    )
   }
   else if(CourseArticle.courseArticles.length()<1){
    return(
        <h1>Not Article</h1>
            )
   }
   else{
    return(
<h1>Not Article</h1>
    )
   }
}