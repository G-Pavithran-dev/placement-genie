import { useState } from 'react'
import './Card.css'

/**
 * A card component that shows double content
 *
 * @param {*} props
 * @returns Card
 */

const Card = (props) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const handleReveal = () => {
    setIsRevealed(true)
  }
  const handleHide = () => {
    setIsRevealed(false)
  }

  return (
    <section className='card' onMouseOver={handleReveal} onMouseLeave={handleHide}>
      {!isRevealed ? (
        <>
          <section className="not-revealed">{props.frontMsg}</section>
        </>
      ) : (
        <>
          <section className="revealed">{props.children}</section>
        </>
      )}
    </section>
  )
}
export default Card
