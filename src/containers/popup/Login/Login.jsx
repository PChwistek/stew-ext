import React from 'react'
import TextField from '../../common-ui/TextField'
import Button from '../../common-ui/Button'
import Checkbox from '../../common-ui/Checkbox'


export default function Login(props) {
  return (
    <div>
      <div className={ 'login' }>
        <div className={ 'login__image-container'}>
          <img src={ '../../../assets/stew-logo.png' } className={ 'login__image '} />
        </div>
        <div className={ 'login__form-row'}>
          <TextField type={ 'text' } label={ 'Username' } setValue={ () => {} } value={ '' }/>
        </div>
        <div className={ 'login__form-row'}>
          <TextField type={ 'password' } label={ 'Password' } setValue={ () => {} } value={ '' }/>
        </div>
        <div className={ 'login__form-row login__form-row--center'}>
          <Checkbox label={ 'Remember Me?' } checked={ false } setValue={ () => {} }/>
        </div>
        <div className={ 'login__form-row--submit'}>
          <Button type={ 'primary'} text={ 'Login'} />
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
