import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import "../../css/mnimi.css";
import { API_URL, emailLabel, newsletter, submitLabel} from "../../dictionary/text";

export function SubscriptionComponent(props) {
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
    <div className="subscription-box black-bg">
      <p className="nav-header"
      >
        {newsletter}
      </p>
      <br></br>
      <form onSubmit={sendSubscription}>
        <p className="mnimi" style={{ textAlign: "left", color: "white" }}>
          <input
            id="input"
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="input" alt={emailLabel} placeholder={emailLabel}></label>
        </p>
        <input type="Submit" className="button btn-01 btn--white use-ajax js-form-submit form-submit w-100" value={submitLabel}></input>
      </form>
    </div>
  );
}

export default SubscriptionComponent;
