import React from 'react';
import {ButtonGroup, Button} from 'reactstrap'
import classnames from 'classnames'

const HelCheckbox = ({data, direction, onChange}) => {
    const onItemUncheck = (itemId) => {
        const selectedValues = data.filter(x => x.selected && x.id !== itemId)
        onChange(selectedValues)
    }
    const onItemCheck = (itemId) => {
        const selectedValues = data.filter(x => x.selected || x.id === itemId)
        onChange(selectedValues)
    }

    return (
        <div className={classnames('hel-checkbox', {'horizontal': direction === 'horizontal', 'vertical': direction === 'vertical'})}>
            <ButtonGroup>
                {data.map((d, index) => {
                    return (
                        <Button 
                            onClick={() => d.selected ? onItemUncheck(d.id) : onItemCheck(d.id)}
                            key={d.id}
                            active={d.selected}
                        >{d.label}</Button>
                    )
                })}
            </ButtonGroup>
        </div>
    );
}

HelCheckbox.defaultProps = {
    direction: 'vertical',
}

export default HelCheckbox
