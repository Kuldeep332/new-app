import { useState } from "react";
import Create from "./components/Create";

const App = () => {
    const [tasks, settasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    return (
        <div className="overflow-x-hidden border-t-2 w-screen min-h-[100vh] bg-zinc-800 flex  items-center flex-col">
           
            <Create tasks={tasks} settasks={settasks} />
        </div>
    );
};

export default App;
