import React, { Children, ReactNode } from "react";
import styles from "./stack-scroller.module.css";

type StackScrollerProps = {
  children: ReactNode;
};

const StackScroller: React.FC<StackScrollerProps> = ({ children }) => {
  const panels = Children.toArray(children);

  return (
    <div className={styles.stackScroller}>
      {panels.map((child, index) => (
        <div key={index} className={styles.panel}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default StackScroller;
