import React from 'react'
import { useActionState } from 'react';
import {useNavigate} from 'react-router'
import {login} from '../services/auth'

function validate({ email, password }) {
  const errors = {};

  if (!email) errors.email = "אימייל הוא שדה חובה";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "כתובת האימייל אינה תקינה";

  if (!password) errors.password = "סיסמא היא שדה חובה";
  else if (password.length < 6) errors.password = "הסיסמא חייבת להכיל לפחות 6 תווים";

  return errors;
}

export default function Uncontrolled() {
    const navigate = useNavigate();

  function handleAction(prevState,formData) {
    const data = Object.fromEntries(formData);
    const errors = validate(data);
     if (Object.keys(errors).length > 0) {
           return; 
    };

    const user = login(data);
    if (user) {
      navigate("/recipes");
    }
  }
  return (
    <form action={handleAction}>
    <h1>התחברות לא מבוקר</h1>
    <div>
         <label>אימייל</label>
        <input name="email" type="text" />
      </div>

      <div>
        <label>סיסמא</label>
        <input name="password" type="password" />
      </div>

      <button type="submit">התחברי</button>
    </form>
  )
}
