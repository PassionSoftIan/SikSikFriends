"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { RoomInfo } from "@/types";
import styles from "./modal.module.scss";

interface Props {
  onClose: () => void;
}

export default function CreateRoomModal({ onClose }: Props) {
  const router = useRouter();

  const [checkTitle, setCheckTitle] = useState("");
  const [checkpassword, setCheckPassword] = useState("");

  const [titleValidation, setTitleValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [typeValidation, setTypeValidation] = useState(false);

  const [passwordCheckBox, setPaswordCheckBox] = useState(true);

  const [formData, setFormData] = useState<RoomInfo>({
    title: "",
    count: 1,
    countProblem: 1,
    countTimer: 1,
    type: [],
    password: "",
  });

  /** 게임 방 생성 */
  const handleCreateGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleValidation && passwordValidation && formData.type.length) {
      console.log(formData);

      /** 게임방 POST 요청 */
      try {
        // const response = await serverAxios.post("/", formData);
        // console.log(response);
        const id = 1;
        router.push(`/room/${id}`);
      } catch (err) {
        console.log(err);
        // Axios 연결 전 임시 데이터
        const id = 1;
        router.push(`/room/${id}`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const { value } = e.target;

    // 문제수 체크
    if (key === "countProblem") {
      let countProblemValue = Number(value);

      if (countProblemValue > 20) {
        countProblemValue = 20;
      } else if (countProblemValue < 1) {
        countProblemValue = 1;
      }
      setFormData({ ...formData, [key]: countProblemValue });
    }

    // 인원수 체크
    else if (key === "count") {
      let countPeople = Number(value);
      if (countPeople < 1) {
        countPeople = 1;
      }
      setFormData({ ...formData, [key]: countPeople });
    }

    // 방제목 체크
    else if (key === "title") {
      if (value.length >= 2 && value.length <= 10) {
        setCheckTitle("");
        setFormData({ ...formData, [key]: value });
        setTitleValidation(true);
      } else {
        setCheckTitle("방제목을 2자 이상 10자 이하로 해주세요");
        setFormData({ ...formData, [key]: value });
        setTitleValidation(false);
      }
    }

    // 비밀번호 체크
    else if (key === "password") {
      if (value.length >= 4 && value.length <= 10) {
        setFormData({ ...formData, [key]: value });
        setCheckPassword("");
        setPasswordValidation(true);
      } else {
        setCheckPassword("비밀번호는 4글자 이상 10글자 이하로 해주세요");
        setFormData({ ...formData, [key]: value });
        setPasswordValidation(false);
      }
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };
  /**  종류 체크 */
  const typeClick = (val: string) => {
    // val이 typeList에 이미 포함되어 있는지 확인
    const typeList = formData.type;
    const index = typeList.indexOf(val);

    if (index !== -1) {
      // val이 이미 존재하면 제거
      const updatedList = [...typeList];
      updatedList.splice(index, 1);
      setFormData({ ...formData, type: updatedList });
      if (updatedList.length > 0) {
        setTypeValidation(false);
      }
    } else {
      // val이 존재하지 않으면 추가
      setFormData({ ...formData, type: [...typeList, val] });
      setTypeValidation(true);
      console.log(typeValidation);
    }
  };
  const checkBtn = () => {
    setPaswordCheckBox(!passwordCheckBox);
    if (!passwordCheckBox) {
      setCheckPassword("");
      setFormData({ ...formData, password: "" });
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
    }
  };

  return (
    <div className={styles.createModal}>
      <div className={styles.modalImg}>
        <Image
          src="/images/actor/gosm1.png"
          alt="방 생성 캐릭터"
          fill
          style={{
            objectFit: "contain",
          }}
          priority
          quality={100}
        />
      </div>
      <div className={styles.modalContainer}>
        <form className={`${styles.form}`} onSubmit={handleCreateGame}>
          <div className={styles.subText}>방 만들기</div>
          {/* 방제목 */}
          <div className={styles.inputDiv}>
            <label htmlFor="title">제목</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={(e) => handleChange(e)} />
            {checkTitle && <div className={styles.errMsg}>{checkTitle}</div>}
          </div>
          {/* 문제수 */}
          <div className={styles.inputDiv}>
            <label htmlFor="countProblem">문제수</label>
            <input
              type="number"
              name="countProblem"
              id="countProblem"
              value={formData.countProblem}
              onChange={(e) => handleChange(e)}
              max={20}
              min={1}
            />
          </div>
          {/* 문제 종류 */}
          <div className={styles.inputDiv}>
            <label htmlFor="type">문제 종류</label>
            <div>{formData.type}</div>
            <button
              type="button"
              name="type"
              id="type"
              onClick={() => typeClick("경제")}
              className={formData.type.includes("경제") ? styles.selected : ""}
            >
              경제
            </button>{" "}
            <button
              type="button"
              name="type"
              id="type"
              onClick={() => typeClick("사회")}
              className={formData.type.includes("사회") ? styles.selected : ""}
            >
              사회
            </button>
            <button
              type="button"
              name="type"
              id="type"
              onClick={() => typeClick("생활/문화")}
              className={formData.type.includes("생활/문화") ? styles.selected : ""}
            >
              생활/문화
            </button>
            <button
              type="button"
              name="type"
              id="type"
              onClick={() => typeClick("세계")}
              className={formData.type.includes("세계") ? styles.selected : ""}
            >
              세계
            </button>
            <button
              type="button"
              name="type"
              id="type"
              onClick={() => typeClick("It/과학")}
              className={formData.type.includes("It/과학") ? styles.selected : ""}
            >
              It/과학
            </button>
          </div>
          {/* 인원 */}
          <div className={styles.inputDiv}>
            <label htmlFor="count">인원</label>
            <input type="number" name="count" id="count" value={formData.count} onChange={(e) => handleChange(e)} />
          </div>
          {/* 비밀번호 */}
          <div className={styles.inputDiv}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="text"
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              disabled={passwordCheckBox}
            />
            <input type="checkbox" onClick={checkBtn} />
            {checkpassword && <p style={{ color: "red" }}>{checkpassword}</p>}
          </div>
          <div className={styles.btns}>
            <button className={`${styles.btn}`} type="submit">
              확인
            </button>
            <button className={`${styles.btn}`} type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
