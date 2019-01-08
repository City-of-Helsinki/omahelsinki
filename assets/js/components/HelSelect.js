import React from 'react'
import Select from 'react-select'

class HelSelect extends React.Component {
  render() {
    const { options, ...rest } = this.props

    return (
      <Select
        name="hel-select"
        className="region-select"
        isMulti
        onChange={this.props.handleChange}
        styles={{
          multiValue: base => ({
            ...base,
            border: 0,
            background: '#0500B7',
            color: 'white',
            padding: '5px 10px'
          }),
          multiValueLabel: base => ({
            ...base,
            color: 'white',
            fontSize: '16px'
          }),
          multiValueRemove: base => ({
            ...base,
            ':hover': {
              cursor: 'pointer',
              background: 'initial'
            }
          })
        }}
        options={options}
        {...rest}
      />
    )
  }
}

export default HelSelect
