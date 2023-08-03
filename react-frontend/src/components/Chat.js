import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [incomingText, setIncomingText] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(()=>{

    fetch('http://localhost:5000/get_messages')
    .then(res=>res.json())
    .then(data=>{
        const saved_messages = data.message.reverse();
        const new_messages = saved_messages.map((item)=>{
            return JSON.parse(item);
        })
        if(saved_messages.length > 0){
            setMessages(new_messages)
        }
    })
  }, [])
  const handleSendMessage = () => {
    if (input.trim() !== "") {
        if(currentMessage.trim() !== ''){
            setMessages(prev=>prev.concat({data:currentMessage,sender:'server'}));
            setCurrentMessage('');
        }
      sendMessage(input);
      setMessages((prev) => prev.concat({ data: input, sender: "user" }));
      setInput('');
    }
  };

  const sendMessage = (message) => {
    try {
      const socket = io("ws://localhost:8080", {
        transports: ["websocket"],
      });
      socket.emit("stream", message);
      socket.on("stream", (data) => {
        setIncomingText(data);
      });
      setInput("");
    } catch (e) {
      console.log(e);
    }
    console.log(message);
    setInput("");
  };

  useEffect(() => {
    if (incomingText !== "") {
        console.log(incomingText);
      const message = JSON.parse(incomingText);
      setCurrentMessage(message.message);
      setIncomingText('');
    }
  }, [incomingText]);
  return (
    <div>
      Chat Channel:
      <div
        style={{
          height: "60vh",
          overflow: "auto",
        }}
      >
        {messages.map((m, k) => (
          <div
            key={k}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              margin: "10px",
            }}
          >
            <div
              style={{
                borderRadius: "10px",
                border: "1px solid black",
                padding: "5px",
                display: "inline-block",
              }}
            >
              {m.data}
            </div>
          </div>
        ))}
        {currentMessage && (
          <div
          style={{
            textAlign: 'left',
            margin: '10px'
          }}>
            <div
              style={{
                backgroundColor: "#f1f8e9",
                padding: "10px",
                borderRadius: "20px",
                display: "inline-block",
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              {currentMessage}
            </div>
          </div>
        )}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Please enter..."
        style={{
          width: "60%",
          height: "100px",
          padding: "10px",
          marginTop: "10px",
          color: "black",
          backgroundColor: "white",
        }}
      />
      <br />
      <button
        onClick={handleSendMessage}
        style={{
          color: "red",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
