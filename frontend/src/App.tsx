import { useCreateResourceModal } from "./common/states";
import CreateFloatingButton from "./components/common/CreateFloatingButton";
import CreateModal from "./components/common/CreateModal";
import Title from "./components/common/Title";
import Deployments from "./components/deployments/Deployments";
import Namespace from "./components/namespaces/Namespace";
import Pods from "./components/pods/Pods";

function App() {
  const openCreateModal = useCreateResourceModal((state) => state.openModal);
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-5">
        <div className="h-32"></div>
        <Namespace />

        <Title className="text-indigo-900" text="Deployments" />
        <Deployments />

        <Title className="text-blue-900" text="Pods" />
        <Pods />

        <div className="h-32"></div>

        <CreateFloatingButton onClick={openCreateModal} />
        <CreateModal />
      </div>
    </div>
  );
}

export default App;
