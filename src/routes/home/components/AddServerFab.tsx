import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Avatar } from '@nextui-org/react';
import AddServerForm from '$components/AddServerForm';

export default function AddServerFab() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Avatar className="cursor-pointer" radius="md" onClick={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">서버 추가</ModalHeader>
          <ModalBody>
            <AddServerForm onAdded={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
