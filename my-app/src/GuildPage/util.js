import { useState } from 'react';

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onClickModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return {
    isOpenModal,
    onClickModal,
  };
};

export const useRoomModal = () => {
  const [isOpenRoomModal, setIsOpenRoomModal] = useState(false);

  const onClickRoomModal = () => {
    setIsOpenRoomModal(!isOpenRoomModal);
  };

  return {
    isOpenRoomModal,
    onClickRoomModal,
  };
};

export default useModal;
