import { useState } from "react";
import "./App.css";
import Button from "./Components/Button";
import Module from "./Components/Module";
import Taskdata from "./Components/Taskdata";


function App() {
  const [addbuttonstate, setaddbuttonstate] = useState(false);
  const [taskdatastate, settaskdatastate] = useState(true);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [priority, setpriority] = useState("");
  const [date, setdate] = useState("");
  const [tasks, settasks] = useState([]);
  const [isdone, setisdone] = useState(false);
  const [editindex, seteditindex] = useState(null);
  const [createdOn, setCreatedOn] = useState(null);
  const [readOnly, setReadOnly] = useState(false);




  return (
    <>
      <div className="button">
        <Button
          addbuttonstate={addbuttonstate}
          setaddbuttonstate={setaddbuttonstate}
        ></Button>
      </div>

      {addbuttonstate && (
        <div className="modalcontainer">
          <Module
            title={title}
            settitle={settitle}
            description={description}
            setdescription={setdescription}
            priority={priority}
            setpriority={setpriority}
            date={date}
            setdate={setdate}
            setaddbuttonstate={setaddbuttonstate}
            tasks={tasks}
            settasks={settasks}
            isdone={isdone}
            setisdone={setisdone}
            editindex={editindex}
            seteditindex={seteditindex}
            readOnly={readOnly}
            setReadOnly={setReadOnly}
            createdOn={createdOn}
          ></Module>
        </div>
      )}
      {taskdatastate && (
        <Taskdata
          title={title}
          settitle={settitle}
          description={description}
          setdescription={setdescription}
          priority={priority}
          setpriority={setpriority}
          date={date}
          setdate={setdate}
          settasks={settasks}
          tasks={tasks}
          setaddbuttonstate={setaddbuttonstate}
          settaskdatastate={settaskdatastate}
          isdone={isdone}
          setisdone={setisdone}
          editindex={editindex}
          seteditindex={seteditindex}
          setReadOnly={setReadOnly}
          setCreatedOn={setCreatedOn}
        ></Taskdata>
      )

      }


    </>
  );
}

export default App;
