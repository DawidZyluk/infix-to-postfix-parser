import React from "react";
import styles from "./InfixArray.module.css";

const InfixArray = ({ expression }) => {
  const array = [...expression];

  return (
    <div className={styles.array}>
      <p className={styles.title}>Infix array:</p>
      <table>
        <tbody>
          <tr>
            {array.map((element, index) => {
              return (
                <td key={index} className={styles.element}>
                  {element}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfixArray;
