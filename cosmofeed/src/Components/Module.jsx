import React, { useState, useEffect } from "react";
import "../App.css";

function Module({
  title,
  settitle,
  description,
  setdescription,
  priority,
  setpriority,
  date,
  setdate,
  setaddbuttonstate,
  tasks,
  settasks,
  isdone,
  setisdone,
  editindex,
  seteditindex,
  createdOn,
  readOnly = false,
  setReadOnly,
}) {
  const [editorHtml, setEditorHtml] = useState(description);

  function handlecancelclick(e) {
    e.preventDefault();
    console.log("Cancel Clicked");
    setaddbuttonstate(false);
    settitle("");
    setdescription("");
    setpriority("");
    setdate("");
    seteditindex(null);
  }

  function handlesaveclick(e) {
    // Get the current timestamp
    e.preventDefault();
    var timestamp = Date.now();

    // Convert it to a Date object
    const createdDate = new Date(timestamp);
    const year = createdDate.getFullYear();
    const month = ("0" + (createdDate.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ("0" + createdDate.getDate()).slice(-2);

    // Combine them to create the yyyy-mm-dd format
    const formattedDate = `${year}-${month}-${day}`;

    const newtask = {
      title,
      priority,
      createdOn: formattedDate,
      date,
      description,
      isdone,
      editindex,
    };

    if (editindex !== null) {
      // If editing, update the task at the edit index
      const updatedTasks = tasks.map((task, index) =>
        index === editindex ? { ...task, ...newtask } : task
      );
      settasks(updatedTasks); // Update the tasks state with the modified task
    } else {
      // If not editing, add the new task
      settasks((prevtasks) => [newtask, ...prevtasks]);
    }

    e.preventDefault();
    settitle("");
    setdescription("");
    setpriority("");
    setdate("");
    seteditindex(null);
    setaddbuttonstate(false);
    console.log("Save clicked");
  }
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setaddbuttonstate(false); // Close the menu when Escape is pressed
    }
  };

  function closeView() {
    setaddbuttonstate(false);
    setReadOnly(false);
    settitle("");
    setdescription("");
    setpriority("");
    setdate("");
    seteditindex(null);
    setaddbuttonstate(false);
    setisdone(false);
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = (value) => {
    setEditorHtml(value);
  };

  return (
    <div className="main">
      {!readOnly ? (
        <form onSubmit={handlesaveclick} className="main-form">
          <div>
            <label>Title </label>
            <input
              className="title"
              type="text"
              required
              value={title}
              placeholder="Give title here"
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="description"
              placeholder="Give description here"
              required
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>

          <div className="third">
            <label>Priority</label>
            <select
              onChange={(e) => setpriority(e.target.value)}
              required
              value={priority}
            >
              <option disabled value="">
                None
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label>Due date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setdate(e.target.value)}
              required
              style={{
                borderRadius: "10px",
              }}
            ></input>
          </div>

          <div>
            <button className="modalbutton" type="submit">
              Save
            </button>
            <button onClick={handlecancelclick} className="modalbutton">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="main-form">
          <h3>Task Details</h3>
          <p>
            <strong>Title:</strong> {title}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Priority:</strong> {priority}
          </p>
          <p>
            <strong>Created On:</strong> {createdOn}
          </p>
          <p>
            <strong>Due Date:</strong> {date}
          </p>
          <p>
            <strong>Status:</strong> {isdone ? "Done" : "Open/Pending"}
          </p>

          <button onClick={closeView} style={{ marginTop: "20px" }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Module;
