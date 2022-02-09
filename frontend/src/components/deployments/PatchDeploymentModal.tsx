import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useDetailDeployment } from "../../states/deployments";
import BaseModal from "../common/BaseModal";
import Spinner from "../common/Spinner";

const PatchDeploymentModal: FC = (): JSX.Element => {
  const {
    isPatchModalOpen,
    isLoading,
    name,
    namespace,
    yaml,
    closeModal,
    setYaml,
    retrieve,
    update,
  } = useDetailDeployment((state) => state, shallow);

  useEffect(() => {
    if (isPatchModalOpen) {
      retrieve();
    }
  }, [namespace, name, isPatchModalOpen]);

  return (
    <BaseModal
      title={`YAML 수정`}
      isOpen={isPatchModalOpen}
      closeModal={closeModal}
    >
      <div className="max-h-[70vh] overflow-y-auto rounded-lg mt-4">
        {isLoading ? (
          <Spinner wrapperClassName="h-80" />
        ) : (
          <CodeEditor
            value={yaml}
            language="yaml"
            placeholder="YAML 코드를 입력해주세요."
            onChange={(evn) => setYaml(evn.target.value)}
            padding={15}
            className="bg-gray-800 text-gray-200"
            style={{
              fontSize: 12,
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={() => {
            update();
            closeModal();
          }}
        >
          적용하기
        </button>
      </div>
    </BaseModal>
  );
};

export default PatchDeploymentModal;
