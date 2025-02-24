import { useState, useRef, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Lottie from "lottie-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsRunning(false);

          if (isBreak) {
            setIsBreak(false);
            setTime(sessionLength * 60);
          } else {
            setIsBreak(true);
            setTime(breakLength * 60);
          }
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isBreak, sessionLength, breakLength]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const increaseSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTime((sessionLength + 1) * 60);
    }
  };

  const decreaseSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTime((sessionLength - 1) * 60);
    }
  };

  const increaseBreak = () => {
    if (breakLength < 15) {
      setBreakLength(breakLength + 1);
    }
  };

  const decreaseBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const completedTask = (index) => {
    setTasks((prevTasks) => {
      const newCompletedTask = prevTasks[index];

      setCompleted((prevCompleted) => {
        if (!prevCompleted.includes(newCompletedTask)) {
          return [...prevCompleted, newCompletedTask];
        }
        return prevCompleted;
      });

      return prevTasks.filter((_, i) => i !== index);
    });
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
      <div className="flex justify-center items-center w-screen h-screen mt-auto overflow-x-hidden">
        <img
          src="./lofi.png"
          className="w-full h-full object-cover opacity-80"
          alt="Lofi"
        />
        <div className="absolute inset-0 flex justify-center items-center overflow-x-hidden">
          <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 sm:grid sm:grid-cols-2 w-full h-full xs:flex xs:flex-col xs:gap-10 xs:mt-10  ">
            <div className="flex justify-center items-center">
              <div className="lg:w-[560px] lg:h-[560px] md:h-[560px]  sm:h-[450px] bg-customGreen rounded-3xl bg-opacity-90 m-auto border-black border-2 md:w-[500px] sm:w-[350px] xs:w-[300px] ">
                <div className="lg:w-[453px] lg:h-[261px] xs:w-[250px] md:w-[453px] md:h-[261px] bg-white m-auto mt-10 rounded-3xl border-black border-2 sm:w-[300px] ">
                  <span className="flex justify-center items-center font-mono lg:text-2xl md:text-2xl sm:text-2xl xs:text-xl mt-4">
                    {isBreak ? "BREAK TIME" : "SESSION"}
                  </span>
                  <div className="flex justify-center items-center font-mono lg:text-7xl md:text-7xl sm:text-7xl xs:text-4xl font-bold mt-4">
                    {formatTime(time)}
                  </div>
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => setIsRunning(true)}
                      disabled={isRunning}
                      className="lg:w-[93px] lg:h-[52px] md:w-[93px] md:h-[52px] sm:w-[93px] sm:h-[52px] xs:w-[70px] xs:h-[40px] border border-black rounded-xl mt-6 
  text-black font-semibold hover:bg-customGreen hover:border-green-700"
                    >
                      Start
                    </button>
                    <button
                      onClick={() => {
                        setIsRunning(false);
                        setIsBreak(false);
                        setTime(sessionLength * 60);
                      }}
                      className="lg:w-[93px] lg:h-[52px] md:w-[93px] md:h-[52px] sm:w-[93px] sm:h-[52px] xs:w-[70px] xs:h-[40px]  border border-black rounded-xl mt-6 
  text-black font-semibold hover:bg-customGreen hover:border-green-700 "
                    >
                      Reset
                    </button>
                  </div>
                  <div className=" flex justify-center items-center lg:w-[400px] md:w-[400px] sm:w-[300px] lg:h-8 md:h-8  sm:h-8 xs:h-6 xs:mb-2  sm:mb-2 overflow-hidden mt-2 m-auto">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        isBreak
                          ? "animate-gradient transition-all duration-500"
                          : "animate-gradient transition-all duration-500"
                      }`}
                      style={{
                        width: isRunning
                          ? `${
                              isBreak
                                ? (time / (breakLength * 60)) * 100
                                : (time / (sessionLength * 60)) * 100
                            }%`
                          : "0% ",
                        borderRadius: "10px",
                        margin: "0 5px",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-center gap-12">
                  <div className="lg:w-[200px] lg:h-[150px] md:w-[200px] md:h-[150px] sm:w-[120px] sm:h-[90px] xs:w-[100px] xs:h-[80px] border border-black rounded-2xl mt-6 bg-customDarkGreen">
                    <div className="flex items-center justify-center lg:gap-10 md:gap-10 sm:gap-6 xs:gap-4 lg:w-[180px] lg:h-[80px] md:w-[180px] md:h-[80px] sm:w-[105px] sm:h-[40px] xs:w-[85px] xs:h-[30px] mt-2 m-auto  bg-customGreen opacity-100">
                      <button
                        onClick={increaseBreak}
                        className="text-white lg:text-xl md:text-xl *:hover:text-black sm:text-xs"
                      >
                        <FaPlus />
                      </button>

                      <span className="lg:text-3xl md:text-3xl sm:text-xl">
                        {breakLength}
                      </span>
                      <button
                        onClick={decreaseBreak}
                        className="text-white lg:text-xl md:text-xl  *:hover:text-black sm:text-xs"
                      >
                        <FaMinus />
                      </button>
                    </div>
                    <span className="flex items-center justify-center lg:text-2xl  md:text-2xl  sm:text-xs xs:text-xs mt-4 text-white">
                      Break Length
                    </span>
                  </div>
                  <div className="lg:w-[200px] lg:h-[150px] md:w-[200px] md:h-[150px] sm:w-[120px] sm:h-[90px] xs:w-[100px] xs:h-[80px] border border-black rounded-2xl mt-6 bg-customDarkGreen xs:mb-4">
                    <div className="flex items-center justify-center lg:gap-10 md:gap-10 sm:gap-6 xs:gap-4 lg:w-[180px] lg:h-[80px] md:w-[180px] md:h-[80px] sm:w-[105px] sm:h-[40px] xs:w-[85px] xs:h-[30px] mt-2 m-auto  bg-customGreen opacity-100">
                      <button
                        onClick={increaseSession}
                        className="text-white lg:text-xl md:text-xl *:hover:text-black sm:text-xs"
                      >
                        <FaPlus />
                      </button>
                      <span className="lg:text-3xl md:text-3xl sm:text-xl">
                        {sessionLength}
                      </span>
                      <button
                        onClick={decreaseSession}
                        className="text-white lg:text-xl md:text-xl  *:hover:text-black sm:text-xs "
                      >
                        <FaMinus />
                      </button>
                    </div>
                    <span className="flex items-center justify-center lg:text-2xl  md:text-2xl sm:text-xs xs:text-xs  mt-4 text-white">
                      Session Length
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="lg:w-[560px] lg:h-[560px] md:h-[560px] sm:h-[450px] bg-customGreen rounded-3xl bg-opacity-90 m-auto border-black border-2 md:w-[500px] sm:w-[350px] xs:w-[300px] xs:h-[500px] ">
                <div className="flex justify-center items-center mt-4">
                  <span className="text-xl text-black font-bold">
                    Your Tasks
                  </span>
                </div>

                <div className="flex items-center flex-col">
                  <div className="relative w-[500px] mt-6">
                    <button
                      onClick={addTask}
                      className="absolute flex items-center justify-center rounded-full w-[24px] h-[24px] bg-customGreen lg:left-3 md:left-9 sm:left-28 xs:left-32 top-1/2 transform -translate-y-1/2"
                    >
                      <span className="text-gray-700 text-sm font-bold">+</span>
                    </button>

                    <input
                      className="lg:w-full h-[40px] md:w-[450px] sm:w-[300px] xs:w-[250px] xs:flex xs:m-auto sm:m-auto sm:flex md:m-auto md:flex md:justify-center bg-white bg-opacity-50 rounded pl-10 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900"
                      type="text"
                      placeholder="Add a task..."
                      value={taskInput}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  <div className="lg:w-[500px] md:w-[450px] sm:w-[320px] xs:w-[250px] mt-4 lg:max-h-[200px] md:max-h-[190px] sm:max-h-[140px] xs:max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    {tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between max-h-[250px] overflow-y bg-white bg-opacity-50 rounded-md h-auto  min-h-[50px]   my-1 px-3"
                        >
                          <Checkbox
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                            color="success"
                            checked={completed.includes(tasks[index])}
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
                      <span className="text-gray-500 md:relative md:left-3 sm:relative  xs:relative ">
                        No tasks added yet.
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center w-full">
                    <span className="text-lg font-semibold">Completed</span>
                  </div>
                  <div className="flex flex-col items-start lg:w-[500px] md:w-[450px] sm:w-[320px] xs:w-[250px] lg:max-h-[200px] md:max-h-[190px] sm:max-h-[140px]  xs:max-h-[170px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    {completed.length > 0 ? (
                      completed.map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center w-full  justify-between gap-3 bg-gray-600 bg-opacity-50 rounded-md h-auto min-h-[50px] max-h-[300px]  overflow-y my-1  px-3 "
                        >
                          <div>
                            <Checkbox
                              icon={<StarBorderIcon />}
                              checkedIcon={<StarIcon />}
                              color="success"
                              checked
                            />
                          </div>
                          <span className="w-full line-through lg:max-w-[316px] md:max-w-[270px] sm:max-w-[140px] xs:max-w-[70px] overflow-y-hidden scrollbar-thin break-words whitespace-normal overflow-hidden text-ellipsis">
                            {task}
                          </span>
                          <TaskItem
                            key={index}
                            task={task}
                            onDelete={() => deleteCompletedTask(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 md:relative md:left-3 sm:relative  xs:relative ">
                        No completed tasks.
                      </span>
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
      className="flex justify-center items-center flex-shrink-0 mb-4"
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
        <span className="w-full lg:max-w-[316px] md:max-w-[270px] sm:max-w-[140px] xs:max-w-[70px] overflow-y-hidden scrollbar-thin break-words whitespace-normal overflow-hidden text-ellipsis">
          {task}
        </span>
      )}

      <button
        onClick={handleEditClick}
        className="ml-2 flex items-center flex-shrink-0"
      >
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
