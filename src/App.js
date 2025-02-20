import { useState, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Lottie from "lottie-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const completedTask = (index) => {
    const newCompletedTask = tasks[index];
    setCompleted([...completed, newCompletedTask]);
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const deleteCompletedTask = (index) => {
    setCompleted(completed.filter((_, i) => i !== index));
  };
  const editTask = (index, newTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTask;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="App">
      <div className="flex justify-center items-center w-screen h-screen mt-auto">
        <img
          src="./lofi.png"
          className="w-full h-full object-cover opacity-80"
          alt="Lofi"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="grid grid-cols-2 w-full h-full">
            <div className="flex justify-center items-center">
              <div className="w-[560px] h-[560px] bg-customGreen rounded-3xl bg-opacity-90 m-auto border-black border-2 ">
                <div className="w-[453px] h-[261px] bg-white m-auto mt-10 rounded-3xl border-black border-2">
                  <span className="flex justify-center items-center font-mono text-2xl mt-4">
                    SESSION
                  </span>
                  <div className="flex justify-center items-center font-mono text-7xl font-bold mt-4">
                    25:00
                  </div>
                  <div className="flex justify-center gap-6">
                    <button
                      className="w-[93px] h-[52px] border border-black rounded-xl mt-6 
  text-white font-semibold animate-gradient transition-all duration-500 hover:w-[95px] hover:h-[55px]"
                    >
                      Start
                    </button>
                    <button
                      className="w-[93px] h-[52px] border border-black rounded-xl mt-6 
  text-white font-semibold animate-gradient transition-all duration-500 hover:w-[95px] hover:h-[55px]"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div className="flex justify-center gap-12">
                  <div className="w-[200px] h-[150px] border border-black rounded-2xl mt-6 bg-customDarkGreen">
                    <div className="flex items-center justify-center gap-10 w-[180px] h-[80px] mt-2 m-auto bg-customGreen opacity-100">
                      <button className="text-white text-xl *:hover:text-black ">
                        <FaPlus />
                      </button>

                      <span className="text-3xl">5</span>
                      <button className="text-white text-xl *:hover:text-black ">
                        <FaMinus />
                      </button>
                    </div>
                    <span className="flex items-center justify-center text-2xl mt-4 text-white">
                      Break Length
                    </span>
                  </div>
                  <div className="w-[200px] h-[150px] border border-black rounded-2xl mt-6 bg-customDarkGreen">
                    <div className="flex items-center justify-center gap-10 w-[180px] h-[80px] mt-2 m-auto bg-customGreen opacity-100">
                      <button className="text-white text-xl *:hover:text-black ">
                        <FaPlus />
                      </button>
                      <span className="text-3xl ">25</span>
                      <button className="text-white text-xl *:hover:text-black ">
                        <FaMinus />
                      </button>
                    </div>
                    <span className="flex items-center justify-center text-2xl mt-4 text-white">
                      Session Length
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[560px] h-[560px] bg-customGreen rounded-3xl bg-opacity-90 m-auto border-black border-2">
                <div className="flex justify-center items-center mt-4">
                  <span className="text-xl text-black font-bold">
                    Your Tasks
                  </span>
                </div>

                <div className="flex items-center flex-col">
                  <div className="relative w-[500px] mt-6">
                    <button
                      onClick={addTask}
                      className="absolute flex items-center justify-center rounded-full w-[24px] h-[24px] bg-customGreen left-3 top-1/2 transform -translate-y-1/2"
                    >
                      <span className="text-gray-700 text-sm font-bold">+</span>
                    </button>

                    <input
                      className="w-full h-[40px] bg-white bg-opacity-50 rounded pl-10 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900"
                      type="text"
                      placeholder="Add a task..."
                      value={taskInput}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="w-[500px] mt-4">
                    {tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between  bg-white bg-opacity-50 rounded-md h-auto min-h-[60px] my-1 px-3"
                        >
                          <Checkbox
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                            color="success"
                            onClick={() => completedTask(index)}
                          />

                          <EditTask
                            task={task}
                            index={index}
                            onSave={editTask}
                          />

                          <TaskItem
                            key={index}
                            task={task}
                            onDelete={() => deleteTask(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No tasks added yet.</span>
                    )}
                  </div>

                  <div className="flex justify-start flex-col items-start w-[500px]">
                    <div className="flex justify-center w-full">
                      <span className="text-lg font-semibold">Completed</span>
                    </div>
                    {completed.length > 0 ? (
                      completed.map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 bg-gray-600 bg-opacity-50 rounded-md h-auto min-h-[60px] my-1 w-full px-3"
                        >
                          <div>
                            <Checkbox
                              icon={<StarBorderIcon />}
                              checkedIcon={<StarIcon />}
                              color="success"
                              checked
                            />

                            <span className="text-black line-through">
                              {task}
                            </span>
                          </div>

                          <TaskItem
                            key={index}
                            task={task}
                            onDelete={() => deleteCompletedTask(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No completed tasks.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskItem({ task, onDelete }) {
  const lottieRef = useRef();

  const handleDeleteClick = () => {
    lottieRef.current.play();
    setTimeout(() => {
      onDelete();
    }, 2000);
  };

  return (
    <button
      onClick={handleDeleteClick}
      className="flex justify-center items-center mb-4"
    >
      <Lottie
        lottieRef={lottieRef}
        path="/delete.json"
        loop={false}
        autoplay={false}
        className="w-16 h-16"
      />
    </button>
  );
}

function EditTask({ task, index, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const inputRef = useRef(null);
  const lottieRef = useRef(null);

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (lottieRef.current) {
      lottieRef.current.play();
    }
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(index, newTask.trim() !== "" ? newTask : task);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onSave(index, newTask.trim() !== "" ? newTask : task);
    }
  };

  return (
    <div className="flex items-center w-full">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full border-none bg-transparent focus:ring-0 outline-none text-black"
        />
      ) : (
        <span className="w-full cursor-pointer bg-transparent focus:ring-0 outline-none">
          {task}
        </span>
      )}

      <button onClick={handleEditClick} className="ml-2 flex items-center">
        <Lottie
          lottieRef={lottieRef}
          path="/edit.json"
          className="w-8 h-8"
          loop={false}
        />
      </button>
    </div>
  );
}

export default App;
