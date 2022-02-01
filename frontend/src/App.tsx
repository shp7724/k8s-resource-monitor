import React from "react";
import Title from "./components/common/Title";
import Deployments from "./components/deployments/Deployments";
import Namespace from "./components/namespaces/Namespace";
import Pods from "./components/pods/Pods";

function App() {
  return (
    <div className=" bg-slate-100">
      <div className="container mx-auto">
        <div className=" h-32"></div>
        <Namespace />

        <Title className="text-indigo-900" text="Deployments" />
        <Deployments />

        <Title className="text-blue-900" text="Pods" />
        <Pods />

        <div className=" h-32"></div>
      </div>
    </div>
  );
}

export default App;
