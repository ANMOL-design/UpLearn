import React from "react";
import Message from "./Message";
export default function Chatbox() {
  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          <Message />
          <Message own={true} />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="write something..."
          ></textarea>
          <button className="chatSubmitButton">Send</button>
        </div>
      </div>
    </div>
  );
}
