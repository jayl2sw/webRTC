import React, { useEffect } from 'react';
import { exitRoom } from './GuildPage';
import VideoContainer from './VideoContainer';
import { getLocalPreviewAndInitRoomConnection } from './GuildPage';
import ChatSection from './ChatSection';

const Room = ({ messages, roomInfo, guildId, videoId, learningRecordId, onClickRoomModal }) => {
    useEffect(() => {
        getLocalPreviewAndInitRoomConnection(roomInfo, roomInfo.roomNumber, guildId, videoId, learningRecordId);
        return () => {
            exitRoom();
        }
    }, []);
    return (
        <div>
            <VideoContainer />
            <ChatSection messages={messages} />
            <button onClick={() => {
                onClickRoomModal()
                exitRoom()
            }}>나가기</button>

        </div>
    );
};

export default Room;