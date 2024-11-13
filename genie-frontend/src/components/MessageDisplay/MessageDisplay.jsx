import React from 'react'
import './MessageDisplay.css' // Ensure you have appropriate styles

const MessageDisplay = ({ messages }) => {
  return (
    <div className="message-display">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-container ${
            message.sender === 'user' ? 'user-message' : 'bot-message'
          }`}
        >
          <div className="message-label">
            {message.sender === 'user' ? 'You' : 'Genie'}
          </div>
          <div className="message">{message.text}</div>
        </div>
      ))}
    </div>
  )
}

export default MessageDisplay
