import React from 'react';

const JoinRoom = ({ roomInfo, setVideoId, setLearningRecordId, onClickModal, onClickRoomModal }) => {

    return (
        <div>
            <div>
                {roomInfo.videoId == null && 
                    <div>
                        <p>VideoId</p>
                        <input onChange={(e) => setVideoId(e.target.value)}/>
                    </div>
                }
                <p>learningRecordId</p>
                <input onChange={(e) => setLearningRecordId(e.target.value)}/>
            </div>
            <button onClick ={() => {
                onClickModal()
                onClickRoomModal()
            }}
                >
                입장하기    
            </button>
            <button onClick={() => {
                onClickModal()
            }}>나가기</button>
        </div>
    );
    
};



export default JoinRoom;