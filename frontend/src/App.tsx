import shallow from "zustand/shallow";
import { useTerminal } from "./common/states";
import Title from "./components/common/Title";
import Deployments from "./components/deployments/Deployments";
import Namespace from "./components/namespaces/Namespace";
import Pods from "./components/pods/Pods";
import Terminal from "./components/pods/Terminal";

function App() {
  const { openTerminal } = useTerminal((state) => state, shallow);
  return (
    <div className=" bg-gray-100">
      <div className="container mx-auto">
        <div className=" h-32"></div>
        <Namespace />

        <Title className="text-indigo-900" text="Deployments" />
        <Deployments />

        <Title className="text-blue-900" text="Pods" />
        <Pods />

        <div
          className="cursor-pointer"
          onClick={openTerminal({
            podName: "",
            containerName: "",
            namespace: "",
          })}
        >
          CLick ME!@@
        </div>

        <div className="h-32"></div>
      </div>
    </div>
  );
}

export default App;
