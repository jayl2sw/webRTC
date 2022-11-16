import React from 'react';
import useModal, { useRoomModal } from './util';
import styled from 'styled-components' 
import JoinRoom from './JoinRoom';
import Room from './Room';


const GuildRoomInfo = ({ guildInfo, roomNumber }) => {
    const { isOpenModal, onClickModal } = useModal();
    const { isOpenRoomModal, onClickRoomModal } = useRoomModal();

    let roomInfo = guildInfo.rooms[roomNumber-1];

    return (
        <div>
            {roomInfo &&
                <div>
                    <p>videoId: {roomInfo.videoId}</p>  
                    <p>{roomInfo.roomNumber}</p>
                    <p>현재 접속한 사람들</p>  
                    <p>{ JSON.stringify(roomInfo) }</p>  
                    <button onClick={ () => {
                        onClickModal() 
                    }}>start</button>
                    {isOpenModal && !isOpenRoomModal && 
                        <div isOpenModal={isOpenModal} toggle={onClickModal}>
                            <ModalContainer>
                                <JoinRoom roomInfo={roomInfo} guildId={guildInfo.guildId} onClickModal={onClickModal} onClickRoomModal={onClickRoomModal}/> 
                            </ModalContainer>
                    </div>}
                    {isOpenRoomModal && 
                        <div isOpenRoomModal={isOpenRoomModal} toggle={onClickRoomModal}>
                            <RoomModal>
                                <Room roomInfo={roomInfo} guildId={guildInfo.guildId} onClickRoomModal={onClickRoomModal}></Room>
                            </RoomModal>
                        </div>
                    }
                </div>
            }
        </div>
    );
};


const ModalContainer = styled.div`
  width: 45vw;
  height: 55vh;
  padding: 1vh 1vw;
  background: #ffffff;
  display: flex;
  color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vmin;
  border: none;
  border-radius: 2vmin;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RoomModal = styled.div`
  width: 90vw;
  height: 90vh;
  padding: 1vh 1vw;
  background: #ffffff;
  display: flex;
  color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vmin;
  border: none;
  border-radius: 2vmin;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default GuildRoomInfo;