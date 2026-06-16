import { FormEvent, useEffect, useState } from "react";

type AnswerFormProps = {
  label: string;
  placeholder: string;
  feedback: string | null;
  resetKey: string;
  onSubmit: (answer: string) => void;
};

export default function AnswerForm({
  label,
  placeholder,
  feedback,
  resetKey,
  onSubmit,
}: AnswerFormProps) {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setAnswer("");
  }, [resetKey]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(answer);
  }

  return (
    <form className="answer-form" onSubmit={handleSubmit}>
      <label htmlFor="answer">{label}</label>
      <div className="answer-row">
        <input
          id="answer"
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
        <button className="primary-button" type="submit">
          Valider
        </button>
      </div>
      {feedback ? <p className="feedback" role="status">{feedback}</p> : null}
    </form>
  );
}
