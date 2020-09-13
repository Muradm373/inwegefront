import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import "../../css/mnimi.css";
import { API_URL } from "../../dictionary/text";

export function   SubscriptionComponent(props) {
  const [email, setEmail] = useState("");
  const alert = useAlert();

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const sendSubscription = (event) => {
    event.preventDefault();
    if (validateEmail(email) === true) {
      axios.post(`${API_URL}/subscribe`, {
        email: email,
      });

      alert.show("Subscription Submitted");
    } else {
      alert.error("Email format is wrong, please fix it and try again.");
    }
  };

  return (
    <div className="subscription-box">
      <p
        style={{
          flex: 5,
          display: "flex",
          textAlign: "left",
          fontFamily: "Roboto",
          fontSize: "16px",
          lineHeight: "20px",
          fontWeight: "normal",
          marginBottom: "10px",
          color: "#FFF",
          
        }}
      >
        Subscribe to newsletter:
      </p>
      <form onSubmit={sendSubscription}>
        <p className="mnimi" style={{ textAlign: "left", color: "white" }}>
          <input
            id="input"
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="input" alt="Email" placeholder="Email"></label>
        </p>
        <input type="Submit" className="black-button"></input>
      </form>
    </div>
  );
}

export default SubscriptionComponent;
