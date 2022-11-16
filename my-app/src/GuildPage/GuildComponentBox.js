import React, {useState, useEffect} from 'react';
import GuildRoomInfo from './GuildRoomInfo';

const GuildComponentBox = (props) => {
    const { guildInfo, nickname, socketId } = props
    const [roomNumber, setRoomNumber] = useState(1)

    return (
        <div>
            <div className='container'>
                <div className='buttonContainer'>
                    <button onClick={() => setRoomNumber(1)}>Room1</button>
                    <button onClick={() => setRoomNumber(2)}>Room2</button>
                    <button onClick={() => setRoomNumber(3)}>Room3</button>
                </div>
                <GuildRoomInfo guildInfo={guildInfo} roomNumber={roomNumber}/>
            </div>
        </div>
    );
};

export default GuildComponentBox;