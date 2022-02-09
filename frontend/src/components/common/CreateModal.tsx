import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { FC, useEffect } from "react";
import shallow from "zustand/shallow";
import { useCreateResourceModal } from "../../states/common";
import BaseModal from "./BaseModal";

const CreateModal: FC = (): JSX.Element => {
  const { isOpen, closeModal, yaml, setYaml, create } = useCreateResourceModal(
    (state) => state,
    shallow
  );

  useEffect(() => {
    setYaml(`apiVersion:\nkind:\nmetadata:\n`);
  }, []);

  return (
    <BaseModal title={`리소스 생성`} isOpen={isOpen} closeModal={closeModal}>
      <div className="max-h-[70vh] overflow-y-auto rounded-lg mt-4">
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
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={() => {
            create();
            closeModal();
          }}
        >
          생성하기
        </button>
      </div>
    </BaseModal>
  );
};

export default CreateModal;
