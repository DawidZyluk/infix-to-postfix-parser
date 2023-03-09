import React from 'react'
import styles from './CharactersArray.module.css'

const CharactersArray = ({data, name}) => {
  const array = data ? [...data] : [];

  return (
    <div className={styles.array}>
      <p className={styles.title}>{name} array:</p>
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
  )
}

export default CharactersArray