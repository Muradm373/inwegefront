import React, { useState } from "react";
import axios from "axios";
import { API_URL, detailsLabel, descriptionLabel, submittedLabel, submitLabel, main,emailLabel } from "../../../dictionary/text";
import { useAlert } from "react-alert";
import "../../../css/mnimi.css";

export function Feedback(props) {
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const alert = useAlert();

  const sendFeedback = (event) => {
    event.preventDefault();

    axios.post(`${API_URL}/feedback`, {
      email: email,
      details: details,
      description: description,
    });

    setDetails("");
    setEmail("");
    setDescription("");

    alert.show({submittedLabel});
  };

  return (
    <div className="black-bg">
      <p className="nav-header">{main[2]}</p>
      <form onSubmit={sendFeedback}>
        <br></br>
        <p className="mnimi" style={{ textAlign: "left", color: "white" }}>
          <input
            id="input-description"
            name="description"
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <label
            for="input-description"
            alt={descriptionLabel}
            placeholder={descriptionLabel}
          ></label>
        </p>

        <p className="mnimi" style={{ textAlign: "left", color: "white" }}>
          <input
            id="input-email"
            name="email"
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            
          />
          <label for="input-email" alt={emailLabel} placeholder={emailLabel}></label>
        </p>

        <textarea
          name="details"
          placeholder={detailsLabel}
          className="input-stats"
          style={{
            background:
              "url(images/comment-author.gif) no-repeat scroll 7px 7px",
          }}
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input type="Submit" className="button btn-01 btn--white js-form-submit form-submit mt-2 w-100" value={submitLabel}></input>
      </form>
    </div>
  );
}

export default Feedback;
