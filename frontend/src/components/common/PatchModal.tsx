import CodeEditor from "@uiw/react-textarea-code-editor";
import classNames from "classnames";
import React, { FC, useEffect } from "react";
import { useAuth } from "../../states/auth";
import { DetailState } from "../../states/common";
import BaseModal from "../common/BaseModal";
import Spinner from "../common/Spinner";

const PatchModal: FC<DetailState> = (props): JSX.Element => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  useEffect(() => {
    if (props.isPatchModalOpen) {
      props.retrieve();
    }
  }, [props.namespace, props.name, props.isPatchModalOpen]);

  return (
    <BaseModal
      title={`YAML 수정`}
      isOpen={props.isPatchModalOpen}
      closeModal={props.closeModal}
    >
      <div className="mt-4 max-h-[70vh] overflow-y-auto rounded-lg">
        {props.isLoading ? (
          <Spinner wrapperClassName="h-80" />
        ) : (
          <CodeEditor
            value={props.yaml}
            language="yaml"
            placeholder="YAML 코드를 입력해주세요."
            onChange={(evn) => props.setYaml(evn.target.value)}
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
          disabled={!isAuthenticated}
          className={classNames(
            "inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            {
              "bg-blue-100 text-blue-900 hover:bg-blue-200": isAuthenticated,
              "bg-gray-200 text-gray-500": !isAuthenticated,
            }
          )}
          onClick={() => {
            props.update();
            props.closeModal();
          }}
        >
          적용하기
        </button>
      </div>
    </BaseModal>
  );
};

export default PatchModal;
