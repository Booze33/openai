/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { usePostAiAssistMutation } from "@/state/api";
import { useState, useEffect } from "react";
import MessageFormUi from "./MessageFormUi";

function useDebounce(value, delay) {
  const [, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);
}

const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [appendText, setAppendText] = useState('');
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    triggerAssist(form);
    setMessage("");
    setAttachment("");
  };

  const debouncedValue = useDebounce(message, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      triggerAssist(form);
    }
}, [debouncedValue]);

const handleKeyDown = (e) => {
  if (e.keyCode === 9 || e.keYCode === 13) {
    e.preventDefault();
    setMessage(`${message} ${appendText}`);
  }
  setAppendText('');
}

useEffect(() => {
  if (resultAssist.data?.text) {
    setAppendText(resultAssist.data?.text)
  }
}, [resultAssist])

  return (
    <MessageFormUi
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;