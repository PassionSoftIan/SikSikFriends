"use client";

import { Children, ReactNode, createContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Frame } from "stompjs";
import { RoomInfo, type Quiz, type SoketUser } from "@/types";
import { useWebSocket } from "./WebSocketProvider";
import { useRouter } from "next/navigation";

export const TotalInfoContext = createContext<object | undefined>(undefined);

type SubscriptionQuizProps = {
  children: ReactNode;
};

export default function SubscriptionQuiz({ roomId, children }: { roomId: number; children: React.ReactNode }) {
  const stompClient = useWebSocket();
  const router = useRouter();
  // const params = useParams();
  // const roomId = Number(params.id);
  // eslint-disable-next-line no-null/no-null
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<SoketUser[]>([]);
  const [end, setEnd] = useState<string>("");
  const [roomInfo, setRoomInfo] = useState<RoomInfo | undefined>(undefined);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (stompClient) {
      //게임 퀴즈 구독
      const subscription = stompClient.subscribe(
        `/sub/game/quiz/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const roomQuiz = frame.body;
          // eslint-disable-next-line no-empty
          if (roomQuiz === "start") {
            router.push(`/game/start/play/${roomId}`);
          } else {
            setQuiz(JSON.parse(roomQuiz));
          }
        },
        {}
      );
      //게임 결과 구독
      const subscription1 = stompClient.subscribe(
        `/sub/game/result/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const resultUsers = JSON.parse(frame.body);
          setQuizResult(resultUsers);
        },
        {}
      );

      // 게임 end 구독
      const subscription2 = stompClient.subscribe(
        `/sub/game/end/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const gameEnd = JSON.parse(frame.body);
          setEnd(gameEnd);
        },
        {}
      );

      // room info 구독
      const subscription3 = stompClient.subscribe(
        `/sub/room/info/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const gameEnd = JSON.parse(frame.body);
          setRoomInfo(gameEnd);
        },
        {}
      );
      return () => {
        subscription.unsubscribe();
        subscription1.unsubscribe();
        subscription2.unsubscribe();
        subscription3.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient]);
  return (
    <TotalInfoContext.Provider value={{ quiz, quizResult, end, roomInfo }}>
      {/* 자식 컴포넌트 렌더링 */}
      {children}
    </TotalInfoContext.Provider>
  );
}