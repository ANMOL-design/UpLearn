// import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">
          Lorem ipsum dognissimos suscipit et cum e quos consectetur minus
          totam.
        </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
