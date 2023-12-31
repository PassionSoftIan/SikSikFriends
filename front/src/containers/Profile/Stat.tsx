import styles from "./Profile.module.scss";

interface Props {
  d: any;
  statStyle?: boolean;
}

export default function Stat({ d, statStyle }: Props) {
  return (
    <div className={`${statStyle ? styles.noDataStat : ""} ${styles.stat}`}>
      <svg className={styles["design-tool"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 80 420 340">
        <g>
          <g className={styles.text} opacity=".87" fill="#686868">
            <text className="tool-illustrator" transform="translate(190.31 114.99)">
              경제
            </text>
            <text className="tool-sketch" transform="translate(50.7 193.74)">
              사회
            </text>
            <text className="tool-invision" transform="translate(10.09 316.94)">
              생활/문화
            </text>
            <text className="tool-indesign" transform="translate(190.11 402.93)">
              세계
            </text>
            <text transform="translate(320.09 323.06)">IT/과학</text>
            <text transform="translate(326.68 185.19)">종합</text>
          </g>

          <g className={styles.chart} fill="none" stroke="#333" strokeMiterlimit="10">
            <path
              className="hexagon"
              opacity=".8"
              d="M106.14 309.33V190.21l103.15-59.56 103.17 59.56v119.12l-103.17 59.56-103.15-59.56z"
            />
            <path
              className="hexagon-2"
              opacity=".4"
              strokeDasharray="2"
              d="M291.03 296.23L209 343.61l-82.03-47.38v-94.71L209 154.16l82.03 47.36v94.71z"
            />
            <path
              className="hexagon-3"
              opacity=".4"
              strokeDasharray="2"
              d="M152.45 283.78v-65.64l56.83-32.83 56.85 32.83v65.64l-56.85 32.82-56.83-32.82z"
            />
            <path
              className="hexagon-4"
              opacity=".4"
              strokeDasharray="2"
              d="M173.56 271.6v-41.26l35.72-20.64L245 230.34v41.26l-35.72 20.61-35.72-20.61z"
            />
            <path
              className="hexagon-5"
              opacity=".4"
              strokeDasharray="2"
              d="M194.7 258.73v-16.85l14.6-8.44 14.6 8.44v16.85l-14.6 8.43-14.6-8.43z"
            />
            <path className="bar-1" opacity=".4" strokeDasharray="2" d="M312.45 190.21l-88.55 51.67" />
            <path className="bar-2" opacity=".4" strokeDasharray="2" d="M194.7 241.88l-88.57-51.67" />
            <path className="bar-3" opacity=".4" strokeDasharray="2" d="M194.7 258.73l-88.57 50.6" />
            <path className="bar-4" opacity=".4" strokeDasharray="2" d="M223.9 258.73l88.55 50.6" />
            <path className="bar-5" opacity=".4" strokeDasharray="2" d="M209.3 267.16l-.02 101.73" />
            <path className="bar-6" opacity=".4" strokeDasharray="2" d="M209.3 130.65l-.02 102.79" />
          </g>

          <g className={styles.numbers} opacity=".3" fill="#333">
            <path d="M298.75 252.92l.73-1a2.2 2.2 0 0 0 1.52.71 1.06 1.06 0 0 0 1.18-.93 1 1 0 0 0 0-.17 1 1 0 0 0-.95-1.09h-.17a1.61 1.61 0 0 0-1 .35l-.73-.48.21-3.58h4v1.37h-2.69l-.13 1.34a1.7 1.7 0 0 1 .8-.17 2.08 2.08 0 0 1 2.24 1.9 1.61 1.61 0 0 1 0 .31 2.43 2.43 0 0 1-2.38 2.48h-.22a3.35 3.35 0 0 1-2.41-1.04z" />
            <path d="M279.77 251v-4.17h-2.08l-2.58 4.17v1.12h3.06l.08 1.81h1.52v-1.68h.82V251zm-1.6-1.27v1.14h-1.52l.94-1.54c.21-.39.41-.79.58-1.19z" />
            <path d="M252.9 252.89l.75-1a2.21 2.21 0 0 0 1.54.71c.69 0 1.15-.29 1.15-.83s-.38-1-1.92-1v-1.17c1.27 0 1.67-.37 1.67-1s-.32-.77-.88-.77a2.06 2.06 0 0 0-1.33.63l-.83-1a3.33 3.33 0 0 1 2.29-1c1.45 0 2.43.71 2.43 1.94a1.66 1.66 0 0 1-1.18 1.56 1.78 1.78 0 0 1 1.39 1.73c0 1.31-1.21 2.08-2.62 2.08a3.1 3.1 0 0 1-2.46-.88z" />
            <path d="M231.83 252.83c1.81-1.71 3.08-2.91 3.08-3.93a1 1 0 0 0-.84-1.06h-.16a1.85 1.85 0 0 0-1.27.73l-.89-.87a3 3 0 0 1 2.37-1.21 2.1 2.1 0 0 1 2.33 1.81 2.16 2.16 0 0 1 0 .44 6.44 6.44 0 0 1-2.27 3.66 11.81 11.81 0 0 1 1.19 0h1.44v1.38h-5z" />
            <path d="M207 252.44h1.54v-4.17h-1.33v-1a5.09 5.09 0 0 0 1.77-.64h1.21v5.74h1.33v1.34H207z" />
          </g>
          <path
            className={styles["design-tool-line"]}
            fill="none"
            stroke="#7ec0ee"
            strokeLinejoin="round"
            strokeWidth="3"
            d={d}
          />
        </g>
      </svg>
    </div>
  );
}
