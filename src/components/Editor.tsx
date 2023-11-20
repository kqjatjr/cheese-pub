import { Instance } from '$atoms/accounts';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import generator from 'megalodon';
import React, { ChangeEvent, useState } from 'react';

interface IProps {
  instance?: Instance;
}

const Editor = ({ instance }: IProps) => {
  const [textContent, setTextContent] = useState('');
  const client = instance && generator(instance.type, instance.url, instance.accessToken);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [files, setFiles] = useState<string[]>([]);

  const onClickPostBtn = async () => {
    if (!textContent.length) {
      alert('업로드할 내용을 입력해 주세요');
    }
    const result = await client?.postStatus(textContent, {
      scheduled_at: '',
      media_ids: files.length ? files : [],
    });
    if (result?.status === 200) {
      setTextContent('');
      onClose();
    } else {
      alert(`포스팅에 실패하였습니다.(${result?.status})`);
    }
  };

  const handleUploadMediaFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const result = await client?.uploadMedia(file);
        result && setFiles((prev) => [...prev, result.data.id]);
      } catch (error) {
        console.error('오류:', error);
      }
    } else {
      console.error('파일이 선택되지 않았습니다.');
    }
  };

  return (
    <>
      <Button className="fixed bottom-2 right-2" onClick={onOpen}>
        포스팅
      </Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">포스팅하기</ModalHeader>
          <ModalBody>
            <Textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              maxRows={3}
              label="포스팅 내용"
            />
          </ModalBody>
          <ModalFooter>
            <input type="file" onChange={handleUploadMediaFile} />
            <Button onClick={onClickPostBtn}>업로드</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Editor;
