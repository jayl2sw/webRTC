import React, { useEffect, useState } from 'react';
import GuildComponentBox from './GuildComponentBox'
import io from "socket.io-client";
import Peer from 'simple-peer';


import "./GuildPage.css";

const guildId = 3;
const nickname = "nickname";
const messages = [];

const GuildPage = () => {
  const [bool, setBool] = useState(false);

  useEffect(() => {
    connectWithSocketIOServer();
    setBool(joinGuildChannel(nickname, guildId));
    return () => {
    }
  }, []);


  const [guildInfo, setGuildInfo] = useState({
    guildId: guildId, rooms: [
      {
        roomNumber: 1,
        videoId: null,
        connectedUsers: [],
      },
      {
        roomNumber: 2,
        videoId: null,
        connectedUsers: [],
      },
      {
        roomNumber: 3,
        videoId: null,
        connectedUsers: [],
      },
    ], connectedUsers: []
  })

  useEffect(() => {
    console.log("guildInfo changed:", guildInfo);
  }, [guildInfo])

  const connectWithSocketIOServer = () => {
    socket = io(SERVER);

    socket.on("connect", () => {
      console.log("successfully connected with socket io server");
      console.log(socket.id);
      // setSocketId(socket.id);
    });

    socket.on("guild-update", (data) => {
      setGuildInfo((prevState) => ({
        ...prevState,
        guildId: data.guild.guildId,
        rooms: data.guild.rooms,
        connectedUsers: data.guild.connectedUsers,
      }));
    })

    socket.on("conn-prepare", (data) => {
      const { connUserSocketId } = data;
      console.log("====================prepare 시작===================")
      prepareNewPeerConnection(connUserSocketId, false);

      // inform the user which just join the room that we have prepared for incoming connection
      socket.emit('conn-init', { connUserSocketId: connUserSocketId })
    })

    socket.on("conn-signal", (data) => {
      handleSignalingData(data);
    });

    socket.on("conn-init", (data) => {
      console.log("====================init 시작===================")
      const { connUserSocketId } = data;
      prepareNewPeerConnection(connUserSocketId, true);
    })
  }

  return (
    <div>
      {bool &&
        <GuildComponentBox messages={messages} guildInfo={guildInfo} localStream={localStream} />
      }
    </div>
  );



};


const SERVER = "http://localhost:5002";

let socket = null;

export const joinGuildChannel = (nickname, guildId) => {
  const data = {
    nickname,
    guildId
  }
  console.log("socket---------------------------11111111", socket)
  socket.emit("join-guild-channel", data)
  return true;
};
export const createRoom = (roomNumber, guildId, videoId, learningRecordId) => {
  // emit an event to server that we would like to create new room
  const data = {
    roomNumber,
    guildId,
    videoId,
    learningRecordId,
  };
  console.log("-------------------create room------------------", socket)
  socket.emit("create-room", data);

};
export const joinRoom = (roomNumber, guildId, learningRecordId) => {
  // emit an event to server that we would like to create new room
  const data = {
    roomNumber,
    guildId,
    learningRecordId,
  };
  console.log("-------------------join room------------------", socket)
  socket.emit("join-room", data);
};
export const disconnect = () => {
  // emit an event to server that we would like to create new room
  console.log("-------------------disconnect---------------", socket)
  socket.emit("join-room");
};
export const exitRoom = () => {
  console.log("--------------------exit-room----------------", socket)
  socket.emit("exit-room");
}


let localStream;

// join-room 대체
const defaultConstraint = {
  audio: true,
  video: true,
}

export const getLocalPreviewAndInitRoomConnection = (
  roomInfo, roomNumber, guildId, videoId, learningRecordId
) => {
  navigator.mediaDevices.getUserMedia(defaultConstraint).then(stream => {
    localStream = stream;
    showLocalVideoPreview(localStream);

    if (roomInfo) {
      if (roomInfo.connectedUsers.length === 0) {
        createRoom(roomNumber, guildId, videoId, learningRecordId)
      } else {
        joinRoom(roomNumber, guildId, learningRecordId)
      }
    } else {
      createRoom(roomNumber, guildId, videoId, learningRecordId)
    }
  }).catch(err => {
    console.log('error occurred when trying to get an access to local stream')
    console.log(err);
  })

}


//////////////////////////////////////////UI///////////////////////////////////////////////////////////////
const showLocalVideoPreview = (stream) => {
  // local 프리뷰 바닐라 스크립트로 짜야해서 index.html에 div만들고 index.css에 css적용해야함
  // 근데 모달 뒤에 나와요 어캄?
  const videosContainer = document.getElementById("RTCroom");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

let peers = {};
let streams = {};

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  }
}

const messengerChanel = 'messenger';

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  console.log("==============localstream ============", localStream)
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
    channelName: messengerChanel,
  });

  peers[connUserSocketId].on("signal", (data) => {
    console.log("시그널 출발")
    // webRTC offer, webRTC Answer
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    }

    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream]
  })

  peers[connUserSocketId].on('data', (data) => {
    const messageData = JSON.parse(data);
    appendNewMessage(messageData);
  })
}

const addStream = (stream, connUserSocketId) => {
  // display incoming stream 다른 사람들 스트림 보여줌
  const videosContainer = document.getElementById("RTCroom");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;

  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };
  videoContainer.appendChild(videoElement);


  videoContainer.style.position = "static";
  videosContainer.appendChild(videoContainer);
}

const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
}

const handleSignalingData = (data) => {
  // add signaling data to peer connection
  console.log("받은 시그널 상대에게 돌려보내줌")
  peers[data.connUserSocketId].signal(data.signal);

}

////////////////////// Messages /////////////////////////////


// 들어온 메시지 저장하기
const appendNewMessage = (messageData) => {
  messages = [...messages, messageData]
}

// 메시지 전송하기
// https://www.udemy.com/course/webrtc-practical-course-create-video-chat-group-call-app/learn/lecture/27970252#content
export const sendMessageUsingDataChannel = (messageContent) => {

  const localMessageData = {
    content: messageContent,
    nickname,
    messageCreatedByMe: true
  }

  appendNewMessage(localMessageData);

  const messageData = {
    content: messageContent,
    nickname,
  }
  const stringifiedMessageData = JSON.stringify(messageData);
  for (let socketId in peers) {
    peers[socketId].send(stringifiedMessageData);
  }
}


export default GuildPage;
