import React, { useState } from 'react'
import api from '../../Tools/api'
import SignUp from './SignUp'

function SignUpContainer(props) {
  const [show, setShow] = useState(false)

  function switchShow() {
    if (!show) {
      setShow(true)
    }
    if (show) {
      setShow(false)
    }
  }

  function submitData(data) {
    props.register(data)
  }

  return (
    <>
      <SignUp switchShow={switchShow} show={show} submitData={submitData} />
    </>
  )
}

export default SignUpContainer
