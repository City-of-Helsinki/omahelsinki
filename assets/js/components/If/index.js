/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

const If = ({condition, children}) => {
    return condition ? children : null;
};

export default If;
