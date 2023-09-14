import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from '@nextui-org/react';
import AddServerForm from '$components/AddServerForm';

export default function AddServerFab() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className="fixed bottom-2 right-2">
      <Button onClick={onOpen}>서버 추가하기</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">서버 추가</ModalHeader>
          <ModalBody>
            <AddServerForm onAdded={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
