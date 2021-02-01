import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

function MainHeader(props) {
  return (
    <>
      <div className={'header-wrapper'}>
        <div className={'header'}>
          {props.isAuth ? (
            <div className={'user-bar'}>
              <Button
                style={{ marginRight: 5 }}
                onClick={props.logout}
                variant={'contained'}
                color={'primary'}
                size={'small'}
              >
                Logout
              </Button>
              {/* <Button
                onClick={props.deleteUser}
                variant={'contained'}
                color={'primary'}
                size={'small'}
              >
                Delete
              </Button> */}
            </div>
          ) : (
            <div className={'user-bar'}>
              <NavLink
                to={'login'}
                style={{
                  textDecoration: 'none',
                  marginRight: '5px',
                }}
              >
                <Button variant={'contained'} color={'default'}>
                  Login
                </Button>
              </NavLink>

              <NavLink
                to={'/register'}
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button variant={'contained'} color={'default'}>
                  Register
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MainHeader
