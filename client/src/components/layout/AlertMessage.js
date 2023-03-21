import React from 'react'
import Aler from 'react-bootstrap/Alert'

const AlertMessage = ({info}) => {
  return info === null ? null : (<Aler variant={info.type}> {info.message} </Aler>)
}

export default AlertMessage