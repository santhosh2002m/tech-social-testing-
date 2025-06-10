"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setShowPopup(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="width">
        <h1 className="contact-header">Contact Support</h1>
        <p className="contact-description">
          {" "}
          Have questions or need assistance? Fill out the form below and our
          team will get in touch with you as soon as possible.
        </p>
      </div>
      <div className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
        />
        <textarea
          name="message"
          placeholder="message"
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
        />
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-checkmark">✓</div>
              <h3>Support Request Created!</h3>
              <p>Our representative will contact you shortly</p>
              <button onClick={handleClosePopup} className="popup-button">
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactForm;
