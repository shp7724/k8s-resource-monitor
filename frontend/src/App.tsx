import CreateModal from "./components/common/CreateModal";
import FloatingButtons from "./components/common/FloatingButtons";
import Title from "./components/common/Title";
import ConfigMaps from "./components/configmaps/ConfigMaps";
import Deployments from "./components/deployments/Deployments";
import Ingresses from "./components/ingresses/Ingresses";
import Namespace from "./components/namespaces/Namespace";
import Pods from "./components/pods/Pods";
import Services from "./components/services/Services";

function App() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-5">
        <div className="h-32"></div>
        <Namespace />

        <Title className="text-indigo-900" text="Deployments" />
        <Deployments />

        <Title className="text-blue-900" text="Pods" />
        <Pods />

        <Title className="text-pink-900" text="Services" />
        <Services />

        <Title className="text-teal-900" text="Ingresses" />
        <Ingresses />

        <Title className="text-amber-900" text="ConfigMaps" />
        <ConfigMaps />

        <div className="h-32"></div>

        <FloatingButtons />
        <CreateModal />
      </div>
    </div>
  );
}

export default App;
