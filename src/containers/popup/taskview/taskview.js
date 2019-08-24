import React from 'react'
import PropTypes from 'prop-types'

import pin from '../../../assets/icons8-pin-64.png'
import './taskview.scss'

const TaskView = ({ projectTitle, taskName }) => {
  return (
    <div className="taskview taskview__container">
      <div className="taskview__box">
        <div className="taskview__box__pin-container">
          <img src={ pin } className="taskview__box__pin" />
        </div>
        <p className="taskview__title"> { projectTitle } </p>
        <p className="taskview__task"> { taskName } </p>
      </div>
    </div>
  )
}

TaskView.propTypes = {
  projectTitle: PropTypes.string,
  taskName: PropTypes.string
}

export default TaskView