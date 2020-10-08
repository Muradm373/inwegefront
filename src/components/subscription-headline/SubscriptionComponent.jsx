import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import "../../css/mnimi.css";
import {
  API_URL,
  emailLabel,
  join,
  newsletter,
  submitLabel,
} from "../../dictionary/text";

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
    <div className="">

      <form
        class="footer-form"
        id="footer-form"
        accept-charset="UTF-8"
        onSubmit={sendSubscription}
        
      >
        <div class="js-form-item form-item js-form-type-email form-type-email js-form-item-email form-item-email">
          <div class="form-item__wrap">

            <p
              className="mnimi ml-2"
              style={{ textAlign: "left", color: "white" }}
            >
              <input
                id="input"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                for="input"
                alt={emailLabel}
                placeholder={emailLabel}
              ></label>
            </p>
          </div>
        </div>
        <div
          data-drupal-selector="edit-actions"
          class="form-actions js-form-wrapper form-wrapper"
          id="edit-actions"
        >
          <input
            class="button btn-01 btn--white use-ajax js-form-submit form-submit"
            type="submit"
            id="edit-submit"
            value={join}
          />
        </div>
      </form>
    </div>
  );
}

export default SubscriptionComponent;
