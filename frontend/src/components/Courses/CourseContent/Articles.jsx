import { useState } from "react";
import { IoDocumentOutline } from "react-icons/io5";

export default function ArticleContent(props) {
  // Store Props value in a variable
  const CourseArticle = props.course;
  let courseArticlecontent = [];

  const [hidden, setHidden] = useState({});

  // Checking is Data is availabe else show no Article available
  if (CourseArticle.courseArticles) {
    courseArticlecontent = CourseArticle.courseArticles;
    let i = 1;

    const toggleHide = (index) => {
      setHidden({ [index]: !hidden[index] });
    };

    // The Main Area Where Article were Written
    return (
      <div className="article-content-container">
        <ul>
          {courseArticlecontent.map((item, index) => (
            <>
              <li onClick={() => toggleHide(index)}>
                {"1." + i++} &nbsp; {item.ArticleTitle}
                <span>
                  <IoDocumentOutline />
                </span>
              </li>

              {hidden[index] && (
                <div
                  className="articleDisplaycontainer"
                  dangerouslySetInnerHTML={{ __html: item.ArticleContent }}
                ></div>
              )}
            </>
          ))}
        </ul>
      </div>
    );
  }
  // Will Be Shown When no article is available
  else if (CourseArticle.courseArticles.length() < 1) {
    return (
      <div className="not-available-incourse">
        <h1>Not Article Available</h1>
      </div>
    );
  } else {
    return (
      <div className="not-available-incourse">
        <h1>Not Article Available</h1>
      </div>
    );
  }
}
