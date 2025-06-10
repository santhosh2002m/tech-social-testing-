"use client";
import { useState } from "react";
import RightSide from "@/components/home/RightSide";
import HomeLeft from "@/components/menu/HomeLeft";

// Define the Contact type
interface Contact {
  name: string;
  username: string;
}

// Define the Message type
interface Message {
  text: string;
  sender: "user" | "contact";
}

export default function Chats() {
  const contacts: Contact[] = [
    { name: "HOLLIE HART", username: "@hartllie" },
    { name: "DESIREE MORAN", username: "@morandesi" },
    { name: "STACY MCKENZIE", username: "@stacyzie" },
    { name: "BRAD GILBERT", username: "@bradgi" },
    { name: "OLGA STAFFORD", username: "@staffga" },
    { name: "ODIS NORRIS", username: "@noris" },
    { name: "DAWN YOUNG", username: "@youngda" },
    { name: "DINA PROCTOR", username: "@dinapro" },
  ];

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [newMessage, setNewMessage] = useState<string>("");
  const [showOptions, setShowOptions] = useState<string | null>(null);

  const handleMessageClick = (contact: Contact) => {
    setSelectedContact(contact);
    if (!messages[contact.username]) {
      setMessages((prev) => ({
        ...prev,
        [contact.username]: [],
      }));
    }
    setShowOptions(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      setMessages((prev) => ({
        ...prev,
        [selectedContact.username]: [
          ...(prev[selectedContact.username] || []),
          { text: newMessage, sender: "user" },
        ],
      }));
      setNewMessage("");
    }
  };

  const handleBackClick = () => {
    setSelectedContact(null);
  };

  const toggleOptions = (contact: Contact) => {
    setShowOptions(showOptions === contact.username ? null : contact.username);
  };

  const handleOptionClick = (option: string, contact: Contact) => {
    console.log(`${option} selected for ${contact.name}`);
    setShowOptions(null);
  };

  return (
    <main className="main-content">
      <div className="container sidebar-toggler">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
            <HomeLeft clss="d-lg-none" />
          </div>
          <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
            <div className="chat-container">
              <div className="chat-header">
                <button
                  className="back-button"
                  onClick={handleBackClick}
                  style={{ visibility: selectedContact ? "visible" : "hidden" }}
                >
                  ←
                </button>
                <h2 className="chat-title chat-message-center">
                  {selectedContact ? selectedContact.name : "Chats"}
                </h2>
              </div>
              <div className="chat-content">
                {selectedContact ? (
                  <div className="chat-messages">
                    {messages[selectedContact.username]?.map((msg, index) => (
                      <div
                        key={index}
                        className={`message ${
                          msg.sender === "user"
                            ? "user-message"
                            : "contact-message"
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="chat-list">
                    {contacts.map((contact, index) => (
                      <div key={index} className="chat-contact">
                        <div className="contact-info">
                          <div className="contact-avatar"></div>
                          <div className="contact-details">
                            <p className="contact-name">{contact.name}</p>
                            <p className="contact-username">
                              {contact.username}
                            </p>
                          </div>
                        </div>
                        <div className="contact-actions">
                          <button
                            className="message-button"
                            onClick={() => handleMessageClick(contact)}
                          >
                            Message
                          </button>
                          <div className="options-container">
                            {showOptions === contact.username && (
                              <div className="options-dropdown">
                                <button
                                  className="option-item"
                                  onClick={() =>
                                    handleOptionClick("Option 1", contact)
                                  }
                                >
                                  Option 1
                                </button>
                                <button
                                  className="option-item"
                                  onClick={() =>
                                    handleOptionClick("Option 2", contact)
                                  }
                                >
                                  Option 2
                                </button>
                                <button
                                  className="option-item"
                                  onClick={() =>
                                    handleOptionClick("Option 3", contact)
                                  }
                                >
                                  Option 3
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedContact && (
                <div className="chat-input-container">
                  <button className="chat-icon-button">📎</button>
                  <input
                    type="text"
                    className="chat-input-field"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    className="chat-send-button"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-6 mt-5 mt-xl-0">
            <RightSide />
          </div>
        </div>
      </div>
    </main>
  );
}
