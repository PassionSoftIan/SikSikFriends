import styles from "./SimpleMyProfile.module.css";

export default function SimpleProfile() {
  return (
    <div className={styles.container}>
      <div>프로필, 레벨, 닉네임</div>
      <div>프로필보기버튼, 친구보기 버튼, 친구요청보기 버틍</div>
      {/* <div>경험치</div> */}
    </div>
  );
}
