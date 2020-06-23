import React, { useState } from "react";
import axios from "axios";
import { API_URL, detailsLabel, descriptionLabel } from "../../text";
import { useAlert } from "react-alert";

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

    alert.show("Message Submitted");
  };

  return (
    <div>
      <form onSubmit={sendFeedback}>
        <br></br>
        <input
          name="description"
          placeholder={descriptionLabel}
          className="input-stats description-input-stats"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          name="email"
          placeholder="Email"
          className="input-stats email-input-stats"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <input type="Submit" className="black-button"></input>
      </form>
    </div>
  );
}

export default Feedback;
