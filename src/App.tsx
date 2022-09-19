import { init, send } from "emailjs-com";
import { ChangeEvent, useState } from "react";

const App = () => {
  const userId = process.env.REACT_APP_USER_ID;
  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputContent, setInputContent] = useState("");

  const nameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputName(event.target.value);
  const emailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputEmail(event.target.value);
  const contentChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInputContent(event.target.value);

  const onSubmit = () => {
    if (!userId || !serviceId || !templateId) return;
    init(userId);
    const sendItem = {
      to_name: inputName,
      email: inputEmail,
      content: inputContent,
    };
    send(serviceId, templateId, sendItem).then(() =>
      console.log("success to send email")
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact form</h2>
      <div>
        <div>Your name</div>
        <input type="text" onChange={nameChange} />
        <div>Email address</div>
        <input type="email" onChange={emailChange} />
        <div>Content</div>
        <textarea rows={5} onChange={contentChange} />
        <div style={{ marginTop: "20px" }}>
          <button onClick={onSubmit}>Submit Contact Message!</button>
        </div>
      </div>
    </div>
  );
};

export default App;
