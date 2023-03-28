import React from 'react'
import styles from './CharactersArray.module.css'

const CharactersArray = ({data, name, current, fixed=false}) => {
  const array = data ? [...data] : [];

  return (
    <div className={`${fixed ? styles["array-fixed"] : styles.array}`}>
      {name ? <p className={`${fixed ? styles["title-fixed"] : styles.title}`}>{name}</p> : null}
      <div className={`${fixed ? styles["table-fixed"] : styles.table}`}>

            {array.map((element, index) => {
              return (element &&
                <span key={index} className={`${styles.element} ${current === index && styles.active}`}>
                  {element}
                </span>
              );
            })}
      </div>
    </div>
  )
}

export default CharactersArray