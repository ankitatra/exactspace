import React from 'react';

function ChatMessage({ user, text, likes, onLike }) {
  return (
    <div className="bg-white shadow p-4 rounded-md flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <div className="text-lg font-semibold">{user}</div>
        <div className="text-gray-500">{text}</div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="like-button cursor-pointer" onClick={onLike}>
          <span role="img" aria-label="like">👍</span> {likes}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
