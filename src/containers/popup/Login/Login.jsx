import React, { useState } from 'react'
import TextField from '../../common-ui/TextField'
import Button from '../../common-ui/Button'
import Checkbox from '../../common-ui/Checkbox'

export default function Login(props) {

  const { login } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  function handleLogin() {
    login(username, password)
  }
  
  return (
    <div>
      <div className={ 'login' }>
        <div className={ 'login__image-container'}>
          <img src={ '../../../assets/stew-logo.png' } className={ 'login__image '} />
        </div>
        <div className={ 'login__form-row'}>
          <TextField type={ 'text' } label={ 'Username' } setValue={ setUsername } value={ username } />
        </div>
        <div className={ 'login__form-row'}>
          <TextField type={ 'password' } label={ 'Password' } setValue={ setPassword } value={ password }/>
        </div>
        <div className={ 'login__form-row login__form-row--center'}>
          <Checkbox label={ 'Remember Me?' } checked={ remember } setValue={ setRemember } />
        </div>
        <div className={ 'login__form-row--submit'}>
          <Button type={ 'primary'} text={ 'Login'} onClick={ handleLogin } />
        </div>
      </div>
      <div className={ 'login__register content' }>
        <div className={ 'link' }>
          Need an account? <a a href="https://getstew.com" target="blank"> Register. </a>
        </div>
      </div>
    </div>
  )
}
