import React from "react";
import Deployments from "./components/deployments/Deployments";
import Namespace from "./components/namespaces/Namespace";

function App() {
  return (
    <div className=" bg-slate-100">
      <div className="container mx-auto">
        <div className="h-20"></div>
        <Namespace />
        <Deployments />
      </div>
    </div>
  );
}

export default App;
