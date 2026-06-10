"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    services: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const token = await executeRecaptcha("contact_form");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          token,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message Sent Successfully!");

        setFormData({
          fullName: "",
          company: "",
          phone: "",
          email: "",
          services: "",
          message: "",
        });
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-wrap">
      <h4>Your Success Starts Here!</h4>

      <form onSubmit={handleSubmit}>
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="form-inner">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-inner">
              <label>Company / Organization *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-inner">
              <label>Phone *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-inner">
              <label>Company email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-inner">
              <label>Services *</label>

              <select
                name="services"
                className="form-inner"
                value={formData.services}
                onChange={handleChange}
                required
              >
                <option value="">Service</option>
                <option value="Web Development">Web Development</option>
                <option value="Responsive Web Designs">
                  Responsive Web Designs
                </option>
                <option value="Ecommerce Solutions">
                  Ecommerce Solutions
                </option>
                <option value="SEO/SMO">SEO/SMO</option>
                <option value="Mobile Application Development">
                  Mobile Application Development
                </option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Software Maintenance">
                  Software Maintenance
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-inner">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="primary-btn2 btn-hover black-bg"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit Now"}
          <span></span>
        </button>
      </form>
    </div>
  );
}