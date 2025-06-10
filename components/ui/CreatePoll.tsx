"use client";

import { useState } from "react";
// import Calendar, { Value } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CreatePollProps {
  onCancel: () => void;
  onSubmitPoll: (pollData: any) => void;
}

const CreatePoll: React.FC<CreatePollProps> = ({ onCancel, onSubmitPoll }) => {
  const [pollQuestion, setPollQuestion] = useState<string>("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [hideVotes, setHideVotes] = useState<boolean>(false);
  const [anonymousVotes, setAnonymousVotes] = useState<boolean>(false);
  const [pollDuration, setPollDuration] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [submittedPoll, setSubmittedPoll] = useState<any>(null);

  const addPollOption = (): void => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handleOptionChange = (index: number, value: string): void => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handleStartPoll = (): void => {
    const pollData = {
      question: pollQuestion,
      options: pollOptions.filter((option) => option.trim() !== ""),
      hideVotes,
      anonymousVotes,
      duration: pollDuration ? pollDuration.toISOString() : "",
    };
    setSubmittedPoll(pollData);
    onSubmitPoll(pollData);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setHideVotes(false);
    setAnonymousVotes(false);
    setPollDuration(null);
    setTempDate(null);
    setShowCalendar(false);
  };

  const handleCancelPoll = (): void => {
    setPollQuestion("");
    setPollOptions(["", ""]);
    setHideVotes(false);
    setAnonymousVotes(false);
    setPollDuration(null);
    setTempDate(null);
    setShowCalendar(false);
    setSubmittedPoll(null);
    onCancel();
  };

  const handleHideVotesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setHideVotes(e.target.checked);
    console.log("Hide Votes:", e.target.checked);
  };

  const handleAnonymousVotesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAnonymousVotes(e.target.checked);
    console.log("Anonymous Votes:", e.target.checked);
  };

  const handleCalendarOk = (): void => {
    setPollDuration(tempDate);
    setShowCalendar(false);
  };

  const handleCalendarCancel = (): void => {
    setTempDate(null);
    setShowCalendar(false);
  };

  const toggleCalendar = (): void => {
    setShowCalendar(!showCalendar);
  };

  // Handle calendar change with correct type and event parameter
  // const handleCalendarChange = (
  //   value: Value,
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ): void => {
  //   if (value instanceof Date) {
  //     setTempDate(value);
  //   } else if (Array.isArray(value) && value[0] instanceof Date) {
  //     setTempDate(value[0]); // Use first date if range is provided (though selectRange={false})
  //   } else {
  //     setTempDate(null);
  //   }
  // };

  return (
    <div className="poll-creation w-100">
      {submittedPoll && (
        <div className="submitted-poll mb-4">
          <h6>{submittedPoll.question}</h6>
          <ul>
            {submittedPoll.options.map((option: string, index: number) => (
              <li key={index} className="mb-2 d-flex align-items-center">
                <input
                  type="radio"
                  name="poll-option"
                  id={`option-${index}`}
                  disabled
                />
                <label htmlFor={`option-${index}`} className="ms-2">
                  {option}
                </label>
              </li>
            ))}
          </ul>
          {submittedPoll.duration && (
            <p>
              Ends on: {new Date(submittedPoll.duration).toLocaleDateString()}
            </p>
          )}
          {submittedPoll.hideVotes && <p>Votes hidden until poll ends</p>}
          {submittedPoll.anonymousVotes && <p>Anonymous voting enabled</p>}
        </div>
      )}
      <div className="single-input">
        <textarea
          cols={10}
          rows={2}
          placeholder="What's up?"
          value={pollQuestion}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPollQuestion(e.target.value)
          }
          className="w-100"
        ></textarea>
      </div>
      {pollOptions.map((option, index) => (
        <div className="single-input" key={index}>
          <input
            type="text"
            placeholder="Option"
            value={option}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOptionChange(index, e.target.value)
            }
          />
        </div>
      ))}
      <button
        className="d-flex align-items-center gap-2 mb-3"
        onClick={addPollOption}
        disabled={pollOptions.length >= 5}
      >
        <span className="material-symbols-outlined">add</span>
        <span>Add more options</span>
      </button>
      <div className="single-input mb-3">
        <button className="calendar-btn" onClick={toggleCalendar} type="button">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
        {showCalendar && (
          <div className="calendar-wrapper">
            {/* <Calendar
              onChange={handleCalendarChange}
              value={tempDate || pollDuration}
              minDate={new Date()}
              selectRange={false}
              className="poll-calendar"
            /> */}
            <div className="poll-calendar-buttons">
              <button onClick={handleCalendarCancel}>Cancel</button>
              <button onClick={handleCalendarOk}>OK</button>
            </div>
          </div>
        )}
      </div>
      <div className="checkbox-single">
        <label htmlFor="hide-votes">
          <input
            type="checkbox"
            id="hide-votes"
            checked={hideVotes}
            onChange={handleHideVotesChange}
          />
          <span className="checkmark"></span>
          Hide votes until poll ends
        </label>
      </div>
      <div className="checkbox-single">
        <label htmlFor="anonymous-votes">
          <input
            type="checkbox"
            id="anonymous-votes"
            checked={anonymousVotes}
            onChange={handleAnonymousVotesChange}
          />
          <span className="checkmark"></span>
          Anonymous votes
        </label>
      </div>
      <div className="d-flex align-items-center gap-3 mt-3">
        <div className="d-flex justify-content-between align-items-center w-100 end">
          <div className="d-flex gap-3">
            <button className="text-white" onClick={handleCancelPoll}>
              CANCEL
            </button>
            <button className="cmn-btn" onClick={handleStartPoll}>
              Start Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
