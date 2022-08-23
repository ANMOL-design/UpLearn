import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function FeaturesHome() {

  function rearrange(card) {
    let cards = document.querySelectorAll(".homecards .homecard");
    for (let n = 0; n < cards.length; n++) {
      cards[n].classList.remove("homecard--left");
      cards[n].classList.remove("homecard--center");
      cards[n].classList.remove("homecard--right");
    }
    cards[card].classList.add("homecard--center");
    if (card === 0) {
      cards[2].classList.add("homecard--left");
      cards[1].classList.add("homecard--right");
    }
    else if (card === 1) {
      cards[0].classList.add("homecard--left");
      cards[2].classList.add("homecard--right");
    }
    else if (card === 2) {
      cards[1].classList.add("homecard--left");
      cards[0].classList.add("homecard--right");
    }
  }

 

  useEffect(() => {
    rearrange(1);
  } , []);

  return (
    <div className="features-home">
      <div className="homecards">
        <div className="homecard fill-orange" onClick={() => rearrange(0)}>
          <div className="homecard__icon" data-icon={1} />
          <div className="homecard__detail">details</div>
        </div>
        <div className="homecard fill-blue" onClick={() => rearrange(1)}>
          <div className="homecard__icon" data-icon={2} />
          <div className="homecard__detail">details</div>
        </div>
        <div className="homecard fill-green" onClick={() => rearrange(2)}>
          <div className="homecard__icon" data-icon={3} />
          <div className="homecard__detail">details</div>
        </div>
      </div>
    </div>
  );
}
export default FeaturesHome;
