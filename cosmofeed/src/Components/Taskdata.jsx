import React, { useState, useEffect } from "react";
import { useFilter } from "../hooks/useFilter";

function Taskdata({
  tasks,
  setaddbuttonstate,
  title,
  settitle,
  setdescription,
  setpriority,
  setdate,
  settasks,
  settaskdatastate,
  isdone,
  setisdone,
  editindex,
  seteditindex,
  setReadOnly,
  setCreatedOn,
}) {
  const [sortcallback, setsortcallback] = useState(() => () => {});
  const [filtereddata, setquery] = useFilter(tasks, (task) => task.priority);

  const [donebutton, setdonebutton] = useState(false);

  const [activetab, setactivetab] = useState("all");

  const [globalsearchquery, setglobalsearchquery] = useState("");
  const [filterDate, setfilterDate] = useState("");

  function highlightMatch(text, query) {
    if (!query) return text; // Return plain text if no query is provided
    const regex = new RegExp(`(${query})`, "gi"); // Case-insensitive match
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  function handleeditclick(task, index) {
    if (task.isdone) {
      alert("Edit action is not enabled since task has been completed");
      return;
    }
    setaddbuttonstate(true);
    settitle(task.title);
    setdescription(task.description);
    setpriority(task.priority);
    setdate(task.date);
    seteditindex(index);
  }

  const handledonebutton = (index) => {
    setdonebutton(!donebutton);
    // setisdone(!isdone);
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isdone: !task.isdone } : task
    );
    settasks(updatedTasks);
  };

  const handledeleteclick = (index) => {
    console.log(index);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    settasks(updatedTasks);
  };
  const handleview = (task) => {
    setaddbuttonstate(true);
    settitle(task.title);
    setdescription(task.description);
    setpriority(task.priority);
    setdate(task.date);
    setisdone(task.isdone);
    setReadOnly(true);
    setCreatedOn(task.createdOn);
  };

  const handlepending = (e) => {
    e.preventDefault();
    setactivetab("pending"); // Switch to "pending" tab
  };

  // Handle all tasks
  const handleall = (e) => {
    e.preventDefault();
    setactivetab("all"); // Switch to "all" tab
  };

  // Handle completed tasks
  const handlecompleted = (e) => {
    e.preventDefault();
    setactivetab("completed"); // Switch to "completed" tab
  };

  const visibleTasks = filtereddata
    .filter((task) => {
      //filtering on basis of task tab
      if (activetab === "pending") return !task.isdone; // Pending tasks
      if (activetab === "completed") return task.isdone; // Completed tasks
      return true; // All tasks
    })
    .filter((task) => {
      //filter by filter date option
      if (!filterDate) {
        return true;
      } else {
        return filterDate === task.createdOn;
      }
    })
    .filter((task) =>
      globalsearchquery //global search
        ? `${task.title} ${task.description} ${task.priority} ${task.date}`
            .toLowerCase()
            .includes(globalsearchquery.toLowerCase())
        : true
    )
    .sort(sortcallback || (() => 0));

  const handleFilterDateChange = (e) => {
    e.preventDefault();
    setfilterDate(e.target.value);
  };

  return (
    <div>
      <form>
        <div className="taskDataHeader">
          <input
            type="text"
            placeholder="Search tasks..."
            value={globalsearchquery}
            onChange={(e) => setglobalsearchquery(e.target.value)}
            style={{ padding: "10px 20px", width: "25%" }}
          />
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <label className="date-filter">Filter via date</label>
              <input 
              className="datefilter"
                type="date"
                value={filterDate}
                onChange={(e) => handleFilterDateChange(e)}
                style={{
                  borderRadius: "10px",
                }}
              ></input>
              <img
                style={{
                  height: "15px",
                  width: "15px",
                  marginLeft: "10px",
                }}
                onClick={() => setfilterDate("")}
                src="https://w7.pngwing.com/pngs/609/740/png-transparent-black-arrow-logo-computer-icons-reboot-reset-icon-symbol-restart-text-trademark-logo-thumbnail.png"
              />
            </div>
            <button
              className=""
              id="all-task"
              style={{
                backgroundColor: activetab === "all" ? "green" : "",
              }}
              onClick={handleall}
            >
              All{" "}
            </button>
            <button
              className=""
              id="pending-task"
              style={{
                backgroundColor: activetab === "pending" ? "green" : "",
              }}
              onClick={handlepending}
            >
              Pending{" "}
            </button>
            <button
              className=""
              id="completed-task"
              style={{
                backgroundColor: activetab === "completed" ? "green" : "",
              }}
              onClick={handlecompleted}
            >
              Completed
            </button>
          </div>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>
              Summary
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 384 512"
                className="arrow up-arrow"
                onClick={() => {
                  setsortcallback(
                    () => (a, b) => a.title.localeCompare(b.title)
                  );
                }}
              >
                <title>Ascending</title>
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 384 512"
                className="arrow down-arrow"
                onClick={() => {
                  setsortcallback(
                    () => (a, b) => b.title.localeCompare(a.title)
                  );
                }}
              >
                <title>Descending</title>
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </th>
            <th>
              <select onChange={(e) => setquery(e.target.value.toLowerCase())}>
                <option value="">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </th>

            <th>
              Created On
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 384 512"
                className="arrow up-arrow"
                onClick={() => {
                  setsortcallback(
                    () => (a, b) =>
                      new Date(a.createdOn) - new Date(b.createdOn)
                  );
                }}
              >
                <title>Ascending</title>
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 384 512"
                className="arrow down-arrow"
                onClick={() => {
                  setsortcallback(
                    () => (a, b) =>
                      new Date(b.createdOn) - new Date(a.createdOn)
                  );
                }}
              >
                <title>Descending</title>
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </th>
            <th>
              Due Date
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 384 512"
                className="arrow up-arrow"
                onClick={() => {
                  setsortcallback(
                    () => (a, b) => new Date(a.date) - new Date(b.date)
                  ); // Ascending
                }}
              >
                <title>Ascending</title>
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 384 512"
                className="arrow down-arrow"
                onClick={() => {
                  setsortcallback(
                    () => (a, b) => new Date(b.date) - new Date(a.date)
                  ); // Descending
                }}
              >
                <title>Descending</title>
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleTasks.sort(sortcallback).map((task, index) => (
            <tr key={index} className={task.isdone ? "done-row" : ""}>
              {/* making every row clickable for view */}
              <td onClick={() => handleview(task)}>
                {highlightMatch(task.title, globalsearchquery)}
              </td>
              <td onClick={() => handleview(task)}>{task.priority}</td>
              <td onClick={() => handleview(task)}>{task.createdOn}</td>
              <td onClick={() => handleview(task)}>{task.date}</td>
              <td className="actions">
                {/* once marked as completed edit option is disabled */}
                <button
                  className="edit"
                  onClick={() => handleeditclick(task, index)}
                  style={{
                    opacity: task.isdone && "0.5",
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handledeleteclick(index)}
                >
                  Delete
                </button>
                <button
                  className="done"
                  onClick={() => handledonebutton(index)}
                >
                  {task.isdone ? "Re-open" : "Mark as Done"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Taskdata;
