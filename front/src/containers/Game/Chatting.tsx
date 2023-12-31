"use client";

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import type { Frame } from "stompjs";
import { useWebSocket } from "@/socket/WebSocketProvider";
import { userAtom } from "@/store/userAtom";
import styles from "./game.module.scss";

export default function Chatting() {
  type Message = {
    sender: string;
    msg: string;
    sendTime: string;
  };

  const [chatLog, setChatLog] = useState<Message[]>([]);
  const stompClient = useWebSocket();
  const [user] = useAtom(userAtom);
  const [message, setMessage] = useState({
    sender: user.nickname,
    msg: "",
    sendTime: "",
  });

  /** 채팅 소켓 연결 */
  useEffect(() => {
    if (stompClient) {
      // stompClient를 사용하여 채팅 메시지를 구독합니다.
      const subscription = stompClient.subscribe(
        "/sub/lobby/chat",
        function handleMessageFunction(frame: Frame) {
          const receivedMessage = JSON.parse(frame.body);
          setChatLog((prevChatLog) => [...prevChatLog, receivedMessage]);
        },
        {}
      );

      return () => {
        // 컴포넌트가 언마운트될 때 구독을 언서브스크라이브합니다.
        subscription.unsubscribe();
      };
    }
    return undefined;
  }, [stompClient]);

  /**  메시지 전송 함수 */
  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.msg !== "") {
      if (stompClient) {
        // 펴블리셔
        stompClient.send("/pub/lobby/chat", {}, JSON.stringify(message));

        // 입력 필드 초기화
        setMessage({
          sender: user.nickname,
          msg: "",
          sendTime: "",
        });
      }
    }
  }

  /**  받은 메시지 관리 */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [id]: value,
    }));
  };

  // eslint-disable-next-line no-null/no-null
  const chatLogRef = useRef<HTMLDivElement>(null);

  // 스크롤을 항상 아래로 이동
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <>
      <div className={styles.chatLog} ref={chatLogRef}>
        {chatLog.map((messages, idx) => (
          <div className={styles.chat} key={messages.sendTime + String(idx)}>
            <p className={styles.senderLog}>{messages.sender}: </p>
            <p className={styles.msgLog}>{messages.msg}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className={styles.chatInput}>
        <input
          type="text"
          id="sender"
          key="sender"
          value={message.sender}
          // onChange={(e) => handleInputChange(e)}
          placeholder="보낸이"
          className={styles.sender}
          autoComplete="off"
          readOnly
        />
        <input
          type="text"
          id="msg"
          key="msg"
          value={message.msg}
          onChange={(e) => handleInputChange(e)}
          placeholder="메시지"
          className={styles.input}
          autoComplete="off"
        />
        <button type="submit" className={styles.submitBtn}>
          전송
        </button>
      </form>
    </>
  );
}
