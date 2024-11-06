import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto p-4">
      <div className="bg-[#0A0D12] z-0 bg-opacity-50 h-full w-full absolute top-0"></div>
      <div className="w-full max-w-2xl z-10 rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
        <h1>{name}</h1>
        <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600"
              onClick={onClose}
            >
              <XMarkIcon className="size-4" />
            </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
