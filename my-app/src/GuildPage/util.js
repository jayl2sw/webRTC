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

export const useOverlay = () => {
  const [Overlay, setOverlay] = useState(true);

  const showOverlay = (data) => {
    setOverlay(data);
  };

  return {
    Overlay,
    showOverlay,
  };
};




export default useModal;
