import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi';

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.currentSushis.map((sushi, idx) => {
            return <Sushi
              key={idx}
              sushi={sushi}
              eatSushi={props.eatSushi}
              isSushiEaten={props.isSushiEaten}
            />
          })
        }
        <MoreButton moreSushi={props.moreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer
