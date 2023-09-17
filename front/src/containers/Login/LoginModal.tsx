"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./Login.module.css";
import Modal from "@/components/modal";
import LoginForm from "./LoginForm";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Portal() {
  // 세션을 이용하여 데이터를 불러온다.
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  const [isOpen, setIsOpen] = useState(false);

  /** 모달 활성화 */
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  /** 모달 비활성화 */
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal} className={styles.login}>
        로그인
      </button>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <div className={styles.container}>
            <div className={styles.title}>로그인</div>
            <LoginForm />

            <Link href="/sign-up">
              <div>회원가입</div>
            </Link>
            <button>카카오 로그인</button>

            {/* 닫기 버튼 로고로 바꿔야함 */}
            <button onClick={handleCloseModal} className={styles.closeButton}>
              X
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
