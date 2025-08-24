import React from "react";
import s from "./background.module.css";

const Background: React.FC = () => {
  return (
    <div className={s.root} aria-hidden>
        <div className={s.aurora} />

        <div className={s.noise} />
    </div>
  );
};

export default Background;
