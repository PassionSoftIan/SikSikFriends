import dynamic from "next/dynamic";
import StartBtn from "@/containers/home/startBtn";
import styles from "./home.module.scss";
import Today from "./Today";
import MyProfileCard from "@/components/MyProfileCard";

export default function Home() {
  const DynamicComponentWithNoSSR = dynamic(() => import("./WordCloud"), { ssr: false });
  return (
    <>
      <div className={styles.left}>
        <div className={styles.leftDay}>
          <Today />
        </div>
        <div className={styles.wordCloud}>
          <DynamicComponentWithNoSSR />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.cardContainer}>
          <MyProfileCard />
        </div>
        <div className={styles.buttonContainer}>
          <StartBtn />
        </div>
      </div>
    </>
  );
}
