import React, { useState, createRef } from 'react'
import PropTypes from 'prop-types'
import TextField from 'Common/TextField'
import Button from 'Common/Button'
import stewLogo from 'Assets/stew-title.png'


export default function Login(props) {

  const { login, error, isPending, loggedIn } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let usernameField = createRef()
  let passwordField = createRef()

  function handleLogin() {
    login(username, password)
  }

  // When Enter is pressed, set the focused state to the next element ID provided in each input
  function handleKeyUp(e) {
    e.which = e.which || e.keyCode
    // If the key press is Enter
    if(!loggedIn) {
      if (e.which == 13) {
        switch (e.target.id) {
          case "usernameField":
            passwordField.current.focus()
            return
          case "passwordField":
            handleLogin()
            return
        }
      } else if (e.which == 40) {
        switch (e.target.id) {
          case "usernameField":
            passwordField.current.focus()
            return
        }
      } else if (e.which == 38) {
        switch (e.target.id) {
          case "passwordField":
            usernameField.current.focus()
            return
        }
      }
    }
  }

  return (
    <div>
      <div className={ 'login' }>
        <div className={ 'login__image-container'}>
          <img src={ stewLogo } className={ 'login__image '} />
        </div>
        <div className='login__error'> { error } </div>
        <div className={ 'login__form-row'}>
          <TextField
            id={"usernameField"} 
            type={ 'text' } 
            label={ 'Email' }
            handleKeyUp={ handleKeyUp }
            setValue={ setUsername } 
            value={ username }
            autoFocus 
            innerRef={ usernameField }
        />
        </div>
        <div className={ 'login__form-row' }>
          <TextField
            type={ 'password' } 
            label={ 'Password' } 
            setValue={ setPassword } 
            value={ password }
            id={ 'passwordField' }
            innerRef={ passwordField }
            handleKeyUp={ handleKeyUp }
          />
        </div>
        <div className={ 'login__form-row--submit'}>
        {
          isPending 
            ? <img src={ '../../../assets/flask.svg' } className={ 'loading' }/>
            : <Button type={ 'primary'} text={ 'Login'} onClick={ handleLogin } />
        }
        </div>
        <div className={ 'login__form-row--register' }>
          <div className={ 'link' }>
            <a href="https://www.getstew.com/password-reset" target="blank"> Forgot password? </a>
          </div>
          <br />
          <div className={ 'link' }>
            Need an account? <a href="https://www.getstew.com/sign-up" target="blank"> Register. </a>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  isPending: PropTypes.bool,
  loggedIn: PropTypes.bool.isRequired
}