"use client";
import OpenAI from "openai";
import React, { useState } from "react";
import logo from "../logo.png";

const ChatRoom = () => {
  const openAiKey = process.env.NEXT_PUBLIC_OPENAI_KEY || "";
  const [messages, setMessages] = useState([
    {
      content:
        "Hello, I am Thera AI, your virtual therapist. Tell me what is bothering you 😁",
      role: "assistant",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (newMessage) {
      const openai = new OpenAI({
        apiKey: openAiKey,
        dangerouslyAllowBrowser: true,
      });
      const temp = [
        {
          role: "user",
          content:
            "You are Thera AI, my assistant and I want you to assume the role of my therapist as I'm depressed and have mental health issues. I understand the advice you give me shouldn't be taken as medical advice. I need just short messages/advice to motivate me. Engage me in a conversation.",
        },
        ...messages,
        { content: newMessage, role: "user" },
      ];
      setMessages((prev) => [...prev, { content: newMessage, role: "user" }]);
      setNewMessage("");
      setLoading(true);
      try {
        const gpt3Response = await openai.chat.completions.create({
          max_tokens: 1000, // Adjust this based on desired response length
          model: "gpt-3.5-turbo",
          messages: temp,
        });
        console.log(gpt3Response);
        setLoading(false);
        // setMessages([
        //   ...messages,
        //   { content: gpt3Response.choices[0].message.content, role: "user" },
        //   { content: gpt3Response.choices[0].message.content, role: "assistant" },
        // ]);
        setMessages((prev) => [
          ...prev,
          {
            content: gpt3Response.choices[0].message.content,
            role: "assistant",
          },
        ]);
        setNewMessage("");

        // Simulate a reply from the "Other User" after a short delay (you can replace this with real data)
        // setTimeout(() => {
        //   setMessages([...messages, { text: "Hi there!", sender: "Other User" }]);
        // }, 1000);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-200">
      <div className="flex-1 p-4 overflow-y-auto relative">
        <div className="inset-0">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 p-2 max-w-xs ${
                message.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-300"
              } rounded-lg`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <img
          className="absolute inset-0 w-full h-full"
          src="logo.png"
          alt="Overlay"
          style={{ opacity: 0.1 }}
        />
      </div>
      <div className="p-4 flex-0.5">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 p-2 rounded-full border-2 border-gray-300 focus:outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className="flex items-center justify-between ml-2 bg-blue-500 text-white p-2 px-3 rounded-full hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            {loading && (
              <div className="w-4 h-4 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
            )}
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
