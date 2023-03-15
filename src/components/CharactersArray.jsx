import React from 'react'
import styles from './CharactersArray.module.css'

const CharactersArray = ({data, name, current}) => {
  const array = data ? [...data] : [];

  return (
    <div className={styles.array}>
      {name ? <p className={styles.title}>{name} array:</p> : null}
      <table>
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