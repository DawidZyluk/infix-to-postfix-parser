import React from 'react'
import styles from './CharactersArray.module.css'

const CharactersArray = ({data, name, current, fixed=false}) => {
  const array = data ? [...data] : [];

  return (
    <div className={`${fixed ? styles["array-fixed"] : styles.array}`}>
      {name ? <p className={`${fixed ? styles["title-fixed"] : styles.title}`}>{name}</p> : null}
      <table className={`${fixed ? styles["table-fixed"] : styles.table}`}>
        <tbody>
          <tr>
            {array.map((element, index) => {
              return (
                <td key={index} className={`${styles.element} ${current === index && styles.active}`}>
                  {element}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CharactersArray