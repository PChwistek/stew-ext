import React from 'react'
import Select from 'react-select'

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '1.4em'
  }),
  control: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    fontSize: '1.4em'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontSize: '1em'
  })
}

const MySelect = (props) => (
  <Select options={props.options} isMulti={ props.isMulti } styles={ styles } />
)


export default MySelect