import React from 'react';
import { useState } from 'react';

function Login() {
  function checkPwd(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const pwdInput = formData.get("pwdInput");
  }

  return (
    <form onSubmit={checkPwd}>
      <input name="pwdInput" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;