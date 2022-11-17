import React, { useEffect } from 'react';
import { exitRoom } from './GuildPage';
import VideoContainer from './VideoContainer';



const Room = ({ roomInfo, guildId, onClickRoomModal }) => {
    
    useEffect(() => {
        return () => {
            exitRoom();
        }
    }, []);
    return (
        <div>
            <VideoContainer/>
            <p>{roomInfo.roomNumber}</p>
            <p>{roomInfo.videoId}</p>
            <p>{ JSON.stringify(roomInfo) }</p>  
            <button onClick={() => {
                onClickRoomModal()
                exitRoom()
            }}>나가기</button>
            
        </div>
    );
};

export default Room;