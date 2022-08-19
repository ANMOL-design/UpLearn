import React, { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {/* The banner image of about us  */}
      <div className="about-banner-image"></div>
      {/* Boxes on Both Side  */}
      <div className="about-uplearn">
        <div className="about-left-side">
          <h1>What is UpLearn?</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>

      <div className="about-uplearn">
        <div className="about-left-side">
          <h1 style={{textAlign: 'left'}}>The Future of Education</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <h1 style={{textAlign: 'left', fontSize: '1.75rem', margin: '0.75rem 0px'}}>Mission &amp; Vision:</h1>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores qui velit.</li>
            <li>asperiores eum assumenda ratione quis. Nesciunt perferendis atque quidem et.</li>
            <li>asperiores eum assumenda ratione quis. Nesciunt perferendis atque quidem et.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores qui velit.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores qui velit.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores qui velit.</li>
            <li>asperiores eum assumenda ratione quis. Nesciunt perferendis atque quidem et.</li>
          </ul>
        </div>    
      </div>

      {/* Purpose and Scope About  */}
      <div className="lower-parallel-boxes">
        <div className="lower-left-td">
          <h1>Purpose</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="lower-right-td">
          <h1>Scope</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </>
  );
}
