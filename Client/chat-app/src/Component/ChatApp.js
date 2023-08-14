import React, { useState } from 'react';
import ChatMessage from './Chat';
import { Picker } from 'emoji-mart';
import EmojiPicker from 'emoji-picker-react';
import './MentionList.css'; // Import the CSS file for mention list styles

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentionList, setShowMentionList] = useState(false);
  const [selectedMentionUser, setSelectedMentionUser] = useState(null);

  const handleMessageSend = () => {
    if (inputMessage.trim() !== "") {
      const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = { user: randomUser, text: inputMessage, likes: 0 };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const handleLike = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes += 1;
    setMessages(updatedMessages);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.endsWith('@')) {
      setShowMentionList(true);
    } else {
      setShowMentionList(false);
    }
    setInputMessage(inputValue);
  };

  const handleMentionClick = (user) => {
    setSelectedMentionUser(user);
    setShowMentionList(false);
    setInputMessage(inputMessage.slice(0, -1) + `@${user} `);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 lg:w-1/2">
        <div className="chat-messages space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              user={message.user}
              text={message.text}
              likes={message.likes}
              onLike={() => handleLike(index)}
            />
          ))}
        </div>
        <div className="chat-input mt-4 flex relative">
          <input
            className="border rounded p-2 flex-grow"
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😄
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleMessageSend}
          >
            Send
          </button>
          {showMentionList && (
            <div className="mention-list">
              {user_list.map((user) => (
                <div
                  key={user}
                  className={`mention-item ${selectedMentionUser === user ? 'selected' : ''}`}
                  onClick={() => handleMentionClick(user)}
                >
                  @{user}
                </div>
              ))}
            </div>
          )}
          {showEmojiPicker && (
            <Picker
              style={{ position: 'absolute', bottom: '60px', right: '10px' }}
              onSelect={(emoji) => setInputMessage(inputMessage + emoji.native)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
