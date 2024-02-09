import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const PreferenceCard = ({name, icon}) => {
  return (
    <section className='preferenceCard'>
            <img src={icon} className='preferenceIcon' alt='logo' />
            <h1 className='preferenceHeader'>{name}</h1>
    </section>
  )
}

PreferenceCard.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string
}

export default PreferenceCard