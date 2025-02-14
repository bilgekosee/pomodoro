import { FaPlus, FaMinus } from "react-icons/fa6";
function App() {
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
              <div className="w-[560px] h-[560px] bg-customGreen rounded-3xl bg-opacity-90 m-auto  border-black border-2"></div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-[560px] h-[560px] bg-customGreen rounded-3xl bg-opacity-90 m-auto border-black border-2">
                <div className="w-[453px] h-[261px] bg-white m-auto mt-10 rounded-3xl  border-black border-2">
                  <span className="flex justify-center items-center font-mono text-2xl mt-4">
                    SESSION
                  </span>
                  <div className="flex justify-center items-center font-mono text-7xl font-bold mt-4 ">
                    25:00
                  </div>
                  <div className="flex justify-center gap-6">
                    <button className="w-[93px] h-[52px] border border-black rounded-xl mt-6">
                      Start
                    </button>
                    <button className="w-[93px] h-[52px] border border-black rounded-xl mt-6">
                      Reset
                    </button>
                  </div>
                </div>
                <div className="flex justify-center gap-12">
                  <div className="w-[200px] h-[150px] border border-black rounded-2xl mt-6 bg-customDarkGreen  ">
                    <div className="flex items-center justify-center gap-10 w-[180px] h-[80px] mt-2 m-auto bg-customGreen opacity-100">
                      <FaPlus style={{ color: "white", fontSize: "20px" }} />
                      <span className="text-3xl">5</span>
                      <FaMinus style={{ color: "white", fontSize: "20px" }} />
                    </div>
                    <span className="flex items-center justify-center text-2xl mt-4 text-white">
                      Break Length
                    </span>
                  </div>
                  <div className="w-[200px] h-[150px] border border-black rounded-2xl mt-6 bg-customDarkGreen  ">
                    <div className="flex items-center justify-center gap-10 w-[180px] h-[80px] mt-2 m-auto bg-customGreen opacity-100">
                      <FaPlus style={{ color: "white", fontSize: "20px" }} />
                      <span className="text-3xl">25</span>
                      <FaMinus style={{ color: "white", fontSize: "20px" }} />
                    </div>
                    <span className="flex items-center justify-center text-2xl mt-4 text-white">
                      Session Length
                    </span>
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

export default App;
