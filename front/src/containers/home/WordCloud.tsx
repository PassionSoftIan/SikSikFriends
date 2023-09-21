"use client";

import { useEffect, useState } from "react";
import zingchart from "zingchart/es6";
import { WordCloudAxios } from "@/services/api";
import styles from "./home.module.css";
// eslint-disable-next-line import/extensions
import "zingchart/modules-es6/zingchart-wordcloud.min.js";

interface Config {
  type: string;
  options: {
    words: any;
    minLength: number;
    ignore: string[];
    maxItems: number;
    aspect: string;
    colorType: string;
    palette: string[];
  };
  style?: {
    fontFamily?: string;
    hoverState?: {
      backgroundColor?: string;
      borderRadius?: string;
      fontColor?: string;
    };
    tooltip?: {
      text?: string;
      visible?: boolean;
      alpha?: number;
      backgroundColor?: string;
      borderRadius?: string;
      borderColor?: string;
    };
  };
}
export default function WordCloud() {
  // subpath: 101 경제 / 102 사회 / 103 생활문화 / 104 세계 / 105 IT/과학
  const [path, setPath] = useState<number>(101);
  // const [words, setWords] = useState<{ text: string; count: number }[]>([]);

  type PathDataType = Record<number, string>;
  const pathData: PathDataType = {
    101: "경제",
    102: "사회",
    103: "생활/문화",
    104: "IT/과학",
    105: "세계",
  };
  const [config, setConfig] = useState<Config | undefined>();

  const fetchWord = async (newPath: number) => {
    try {
      const response = await WordCloudAxios.get(`/${newPath}`);
      const words = response.data;
      setConfig({
        type: "wordcloud",
        options: {
          words,
          minLength: 5,
          ignore: [""],
          maxItems: 40,
          aspect: "spiral",
          // rotate: true,
          colorType: "palette",
          palette: [
            "#D32F2F",
            "#5D4037",
            "#1976D2",
            "#E53935",
            "#6D4C41",
            "#1E88E5",
            "#F44336",
            "#795548",
            "#2196F3",
            "#EF5350",
            "#8D6E63",
            "#42A5F5",
          ],
        },
        style: {
          fontFamily: "Crete Round",
          hoverState: {
            backgroundColor: "#D32F2F",
            borderRadius: "2px",
            fontColor: "white",
          },
          tooltip: {
            text: "%text:%hits",
            visible: true,
            alpha: 0.9,
            backgroundColor: "#1976d2",
            borderRadius: "2px",
            borderColor: "none",
          },
        },
      });
    } catch (error) {
      console.log(error);
      // Axios 연결 전 임시 데이터
      const words = [
        {
          text: `${newPath}`,
          count: 1,
        },
        {
          text: `${pathData[newPath]}`,
          count: 2,
        },
      ];
      setConfig({
        type: "wordcloud",
        options: {
          words,
          minLength: 5,
          ignore: [""],
          maxItems: 40,
          aspect: "spiral",
          // rotate: true,
          colorType: "palette",
          palette: [
            "#D32F2F",
            "#5D4037",
            "#1976D2",
            "#E53935",
            "#6D4C41",
            "#1E88E5",
            "#F44336",
            "#795548",
            "#2196F3",
            "#EF5350",
            "#8D6E63",
            "#42A5F5",
          ],
        },
        style: {
          fontFamily: "Crete Round",
          hoverState: {
            backgroundColor: "#D32F2F",
            borderRadius: "2px",
            fontColor: "white",
          },
          tooltip: {
            text: "%text:%hits",
            visible: true,
            alpha: 0.9,
            backgroundColor: "#1976d2",
            borderRadius: "2px",
            borderColor: "none",
          },
        },
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchWord(path);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (config !== undefined) {
        zingchart.render({
          id: "myChart",
          data: config,
          height: "90%",
          width: "100%",
        });
      }
    }
  }, [config]);

  return (
    <div className={styles.wordCloud}>
      <div className={styles.groupContainer}>
        <div className={styles.wordButton}>
          <button
            onClick={() => setPath(101)}
            className={path === 101 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            경제
          </button>
          <button
            onClick={() => setPath(102)}
            className={path === 102 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            사회
          </button>
          <button
            onClick={() => setPath(103)}
            className={path === 103 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            생활/문화
          </button>
          <button
            onClick={() => setPath(104)}
            className={path === 104 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            세계
          </button>
          <button
            onClick={() => setPath(105)}
            className={path === 105 ? `${styles.active} ${styles.button}` : `${styles.button}`}
          >
            IT/과학
          </button>
        </div>
      </div>
      <div id="myChart" />
    </div>
  );
}