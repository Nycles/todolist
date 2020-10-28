import React, { useState } from 'react'
import SignIn from './SignIn'

function SignInContainer(props) {
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
    props.login(data)
  }

  return (
    <>
      <SignIn switchShow={switchShow} show={show} submitData={submitData} />
    </>
  )
}

export default SignInContainer
