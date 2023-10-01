"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { User } from "@/types";
import { serverAxios } from "@/services/api";
import styles from "./game.module.scss";

interface Props {
  data: User;
}

interface TypeTextType {
  [key: number]: string[];
}

export default function UserItem({ data }: Props) {
  const [isActive, setIsActive] = useState(false);
  // eslint-disable-next-line no-null/no-null
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // e.relatedTarget이 buttonRef.current 또는 그 자식 요소인지 확인
    if (buttonRef.current && !buttonRef.current.contains(e.relatedTarget as Node)) {
      setIsActive(false);
    }
  };

  /** 간단한 프로필 모달 열기 */
  const openProfile = () => {
    console.log(1);
  };

  /** data.user_id 로 친구 여부에 따른 버튼 */
  const TypeText: TypeTextType = {
    0: [],
    1: ["요청 취소"],
    2: ["요청 수락", "거절"],
    3: ["친구 요청"],
    4: ["친구 삭제"],
  };
  const [userType, setUserType] = useState(0);

  useEffect(() => {
    /** 친구 상태 확인 */
    const isFriend = async () => {
      try {
        const response = await serverAxios(`/user/friend/${data.user_id}`);
        setUserType(response.data.status);
      } catch (err) {
        console.log("친구 확인 에러", err);
      }
    };
    isFriend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 친구 요청 | 삭제 */
  const handleFriend = async (text: string) => {
    if (userType === 3) {
      // 친구 요청
      try {
        await serverAxios.post(`/user/friend/${data.user_id}`);
        setUserType(1);
      } catch (err) {
        console.log("친구 요청 에러", err);
      }
    } else if (userType === 4 || userType === 1) {
      // 친구 삭제, 친구 요청 취소
      try {
        await serverAxios.delete(`user/friend/${data.user_id}`);
        setUserType(3);
      } catch (err) {
        console.log("친구 삭제 | 취소 에러", err);
      }
    } else if (userType === 2) {
      if (text === "친구 요청 수락") {
        // 친구 수락
        try {
          await serverAxios.put(`user/friend/${data.user_id}`);
          setUserType(4);
        } catch (err) {
          console.log("친구 수락 에러", err);
        }
      } else if (text === "친구 요청 거절") {
        // 친구 삭제
        try {
          await serverAxios.delete(`user/friend/${data.user_id}`);
          setUserType(3);
        } catch (err) {
          console.log("친구 거절 에러", err);
        }
      }
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      className={`${styles.userItem} ${isActive ? styles.active : ""}`}
      onClick={() => setIsActive(true)}
      onBlur={handleBlur}
      ref={buttonRef}
      tabIndex={0}
    >
      <div className={styles.profile}>
        <Image
          src={data?.profile || "/images/character/rabbit.png"}
          alt="프로필"
          fill
          sizes="20vw"
          style={{
            objectFit: "contain",
          }}
          priority
          quality={100}
        />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.userInfo}>
          <div className={`${styles.subBox} ${styles.level}`}>Lv.{data.level}</div>
          <div className={styles.subBox}>{data.nickname}</div>
        </div>
        <div className={`${styles.hiddenBtn} ${isActive ? styles.visible : ""}`}>
          <button className={styles.subBtn} onClick={openProfile}>
            프로필
          </button>
          {TypeText[userType].map((text) => (
            <button key={text} className={styles.subBtn} onClick={() => handleFriend(text)}>
              <span className={styles.buttonText}>{text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
