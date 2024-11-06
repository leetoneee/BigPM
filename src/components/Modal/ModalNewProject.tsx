import React, { useState } from "react";
import Modal from ".";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
        <div>This is the modal</div>
    </Modal>
  );
};

export default ModalNewProject;
