import { Instance, focusInstance } from '$atoms/accounts';
import { QUERY_KEY } from '$queryKey/keys';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
  Image,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import generator from 'megalodon';
import React, { ChangeEvent, useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Editor = () => {
  const [textContent, setTextContent] = useState('');
  const instance = useAtomValue(focusInstance);
  const queryClient = useQueryClient();
  const client = generator(instance.type || '', instance.url, instance.accessToken);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [files, setFiles] = useState<Array<Entity.Attachment | Entity.AsyncAttachment>>([]);

  const { mutate: postEdit } = useMutation(
    () => {
      return client.postStatus(textContent, {
        scheduled_at: '',
        media_ids: files.length
          ? files.reduce((acc, cur) => {
              return [...acc, cur.id];
            }, [] as string[])
          : [],
      });
    },
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          setTextContent('');
          queryClient.invalidateQueries(
            [QUERY_KEY.GET_FEED, instance.id],
            {
              refetchPage: (page, index) => true,
            },
            undefined,
          );
          onClose();
        } else {
          alert(`포스팅에 실패하였습니다.(${res.status})`);
        }
      },
    },
  );

  const { mutate: postMedia } = useMutation(
    (file: any) => {
      return client.uploadMedia(file);
    },
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          setFiles((prev) => [...prev, res.data]);
        } else {
          alert(`업로드에 실패하였습니다.(${res.status})`);
        }
      },
    },
  );

  const handleClickPostBtn = async () => {
    if (!textContent.length) {
      alert('업로드할 내용을 입력해 주세요');
    }
    postEdit();
  };

  const handleUploadMediaFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      postMedia(file);
    } else {
      console.error('파일이 선택되지 않았습니다.');
    }
  };

  const handleClickRemoveFileBtn = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
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
            <input type="file" id="upload-file" hidden onChange={handleUploadMediaFile} />
            <label htmlFor="upload-file" className="w-[40px] h-[40px]">
              <div className="flex justify-center items-center cursor-pointer bg-[#e5e7eb] w-full h-full rounded-lg">
                <FaPaperclip />
              </div>
            </label>
            <div className="flex w-full overflow-x-auto overflow-y-hidden h-[160] gap-[10px]">
              {files.length > 0 &&
                files.map((file) => {
                  if (file.type === 'image' || file.type === 'video') {
                    return (
                      <div className="w-[150px] h-[150px] relative" key={file.id}>
                        <button
                          onClick={() => handleClickRemoveFileBtn(file.id)}
                          className="absolute right-[3px] top-[3px] cursor-pointer z-[999] bg-slate-400 w-[30px] h-[30px] flex items-center justify-center box-border rounded-lg"
                        >
                          <MdDelete size={'20px'} className="cursor-pointer" />
                        </button>
                        <Image isBlurred width={150} src={file.preview_url || undefined} className="object-fill" />
                      </div>
                    );
                  }
                })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClickPostBtn}>업로드</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Editor;
