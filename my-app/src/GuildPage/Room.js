import React from 'react';
import { exitRoom } from './GuildPage';
const Room = ({ onClickRoomModal }) => {
    return (
        <div>
           <button onClick={() => {
                onClickRoomModal()
                exitRoom()
            }}>나가기</button>
        </div>
    );
};

export default Room;