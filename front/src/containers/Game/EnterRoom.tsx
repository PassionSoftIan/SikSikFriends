"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
// import { Varela } from "next/font/google";
import { serverAxios } from "@/services/api";
import type { Room } from "@/types";
import styles from "./game.module.scss";
import Modal from "@/components/gameModal";


interface EnterRoomsProps {
  rooms: Room[];
}

export default function EnterRoom({ rooms }: EnterRoomsProps) {
  console.log("엔터룸프롭스", rooms);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [openSearchRoom, setOpenSearchRoom] = useState(false);
  const [searchRoom, setSearchRoom] = useState("");
  const router = useRouter();
  const [checkTitle,setCheckTitle] = useState("")
  const [checkpassword , setCheckPassword]  = useState("")

  let titleValidtaion = false

  /** 게임 방 ID로 방 정보를 조회하는 함수 */
  const handleSearchRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchRoom);

    try {
      const response = await serverAxios.get("/");
      console.log(response);
    } catch (err) {
      console.log("방 찾기 에러", err);
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    count: 1,
    countProblem: 1,
    type: [],
    password: "",
  });
  /** 게임 생성 */
  const handleCreateGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    /** 게임방 POST 요청 */
    try {
      const response = await serverAxios.post("/", formData);
      console.log(response);
      const id = 1;
      // 모달 종료 후 게임 방 입장
      setOpenCreateRoom(false);
      router.push(`/game/room/${id}`);
    } catch (err) {
      console.log(err);
      // Axios 연결 전 임시 데이터
      const id = 1;
      // 모달 종료 후 게임 방 입장
      setOpenCreateRoom(false);
      router.push(`/game/room/${id}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const { value } = e.target;
    
    // 문제수 체크
    if(key==="countProblem" ){
      let countProblemValue = Number(value)

      if (countProblemValue > 20){
        countProblemValue = 20
      } else if(countProblemValue < 1){
        countProblemValue=1
      } 
    setFormData({ ...formData, [key]: countProblemValue });

    }
    
    // 인원수 체크
    else if(key==="count"){
      let countPeople = Number(value)
      if (countPeople < 1){
        countPeople = 1
      }
    setFormData({ ...formData, [key]: countPeople })
    }


    // 방제목 체크
    else if(key==="title"){
      if(value.length >= 2 && value.length<= 10){
        setCheckTitle("")
        setFormData({ ...formData, [key]: value })
        titleValidtaion = true
      } else{
        setCheckTitle("방제목을 1자 이상 10자 이하로 해주세요")
        setFormData({ ...formData, [key]: value })
        titleValidtaion = false

      }
    }

    // 비밀번호 체크
    else if(key==="password"){
      if(key.length >=4){
        setFormData({ ...formData, [key]: value })
      } else{

      }
    }

    else{
    setFormData({ ...formData, [key]: value })
  };
  };

  const randomOnClick = () => {
    const arr: number[] = [];
    rooms.forEach((element: Room) => {
      if (element.waiting) {
        arr.push(element.id);
      }
    });
    console.log(arr);
    if (arr.length === 0) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomRoomNum = arr[randomIndex];
    router.push(`/game/room/${randomRoomNum}`);
    return 0;
  };
  const typeClick = (val : String) => {
    // val이 typeList에 이미 포함되어 있는지 확인
    let typeList = formData.type
    const index = typeList.indexOf(val);
    
    if (index !== -1) {
      // val이 이미 존재하면 제거
      const updatedList = [...typeList];
      updatedList.splice(index, 1);
      setFormData({ ...formData, ["type"]: updatedList })

    } else {
      // val이 존재하지 않으면 추가
      setFormData({ ...formData, ["type"]: [...typeList, val]});
    }
    
  };

  return (
    <>
      <div>
        <button className={styles.boxButton} onClick={() => randomOnClick()}>
          빠른시작
        </button>
        <button className={styles.boxButton} onClick={() => setOpenSearchRoom(true)}>
          방 찾기
        </button>
        {openSearchRoom && (
          <Modal isOpen={openSearchRoom}>
            <div className={styles.modalContainer}>
              <h1>방찾기</h1>
              <form onSubmit={handleSearchRoom}>
                <label htmlFor="room">방코드</label>
                <input
                  type="text"
                  name="room"
                  id="room"
                  value={searchRoom}
                  onChange={(e) => setSearchRoom(e.target.value)}
                />
                <button type="submit">찾기</button>
              </form>
              <button onClick={() => setOpenSearchRoom(false)}>취소</button>
            </div>
          </Modal>
        )}
      </div>
      <div id="game-modal" className="z-99" />
      <button onClick={() => setOpenCreateRoom(true)} className={styles.boxButton}>
        방 만들기
      </button>
      {openCreateRoom && (
        <Modal isOpen={openCreateRoom}>
          <div className={styles.modalContainer}>
            <h1>방만들기</h1>
            <form onSubmit={handleCreateGame}>
              {/* 방제목 */}
              <label htmlFor="title">제목</label>
              <input type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={(e) => handleChange(e)}
                />
                {checkTitle &&  <p style={{ color: "red" }}>{checkTitle}</p>}
                <br/>


              {/* 문제수 */}
              <label htmlFor="countProblem">문제수</label>
              <input
                type="number" 
                name="countProblem"
                id="countProblem"
                value={formData.countProblem}
                onChange={(e) => handleChange(e)}
                max={20}
                min={1}
                /> < br/>

              
                {/* 문제 종류 */}
                <label htmlFor="type">문제 종류</label>< br/>
                <button
                type="button"
                name="type"
                id="type"
                onClick={() => typeClick("경제")}
                className={formData.type.includes("경제") ? styles.selected : ""}
                >경제</button> < br/>
                <button
                type="button"
                name="type"
                id="type"
                onClick={() => typeClick("사회")}
                className={formData.type.includes("사회") ? styles.selected : ""}
                >사회</button>< br/>
                <button
                type="button"
                name="type"
                id="type"
                onClick={() => typeClick("생활/문화")}
                className={formData.type.includes("생활/문화") ? styles.selected : ""}
                >생활/문화</button>< br/>
                <button
                type="button"
                name="type"
                id="type"
                onClick={() => typeClick("세계")}
                className={formData.type.includes("세계") ? styles.selected : ""}
                >세계</button>< br/>
                <button
                type="button"
                name="type"
                id="type"
                onClick={() => typeClick("It/과학")}
                className={formData.type.includes("It/과학") ? styles.selected : ""}
                >It/과학</button>< br/>

              


              {/* 인원 */}
              <label htmlFor="count">인원</label>
              <input type="number" name="count" id="count" value={formData.count} onChange={(e) => handleChange(e)} /> < br/>

              {/* 비밀번호 */}
              <label htmlFor="password">비밀번호</label>
              <input type="text" name="password" id="password" value={formData.password} onChange={(e) => handleChange(e)} /> < br/>



              {/* 확인버튼 */}
              <button type="submit">확인</button>
            </form>
            <button onClick={() => setOpenCreateRoom(false)}>취소</button>
          </div>
          <div>{formData.type}</div>
        </Modal>
      )}
    </>
  );
}
