const doubtBotData = require("./botUtil");

// returns all the results data in a sanitized format with max length 3
/*
    return Type : Array of Objects of max length 3
    [
        {
            title       : "title",
            link        : "link",
            description : "description"
        }
    ]
*/
async function doubtBot(query) {
  let resultData = [];
    const results = await doubtBotData(query);
    if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            if (i < 3) {
                resultData.push({
                    title: results[i].title,
                    link: results[i].link,
                    description: results[i].description,
                });
            }
        }
    }
    return resultData;
}


// return the answer for the given query
/*
    return Type : String
    "answer"
*/
async function doubtBotAnswer(query) {
  const results = await doubtBot(query);
  const answer = `
    <div>
        <h4 style='margin-bottom: 0px;'>Hi my name is Alice</h1>
        <p>
            I am Doubt Bot by UpLearn and is here to help you
        </p>
    </div>

    <p>
        As per asked question here are some refrences which you can
        <br/>
        follow while our Instructors help you out
    </p>

    <ul>
        ${results
          .map(
            (result) => `
            <li>
                <div style='margin-bottom:5px'>
                    ${result.title}
                </div>
                <a href="${result.link}" target="_blank">
                    Link - ${result.link}
                </a>
                <div style='margin-top:5px'>
                    ${result.description}
                </div>
            </li>
        `
          )
          .join("")}
    </ul>

    <div>
        Hope this helps you. 😀
        <br />
        I am currently in learning stage and if it helps you please like
        <br />
        the answer as it will help me to find more better results for you
    </div>`;
  return answer;
}


module.exports = doubtBotAnswer;
