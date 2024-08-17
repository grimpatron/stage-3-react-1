// import { useRef } from 'react';

// function UncontrolledForm() {
//   const nameRef = useRef<HTMLInputElement | null>(null);
//   const ageRef = useRef<HTMLInputElement | null>(null);
//   const emailRef = useRef<HTMLInputElement | null>(null);
//   const pass1Ref = useRef<HTMLInputElement | null>(null);
//   const pass2Ref = useRef<HTMLInputElement | null>(null);
//   const genderRef = useRef<HTMLInputElement | null>(null);
//   const acceptedRef = useRef<HTMLInputElement | null>(null);
//   const pictureRef = useRef<HTMLInputElement | null>(null);
//   const countryRef = useRef<HTMLInputElement | null>(null);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (nameRef.current && ageRef.current && emailRef.current) {
//       const name = nameRef.current.value;
//       const age = ageRef.current.value;
//       const email = emailRef.current.value;
//     }
//   };

//   return (
//     <>
//       <h2>UncontrolledForm page</h2>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor='name'>Name:</label>
//         <input id='name' name='name' ref={nameRef} />
//         <label htmlFor='age'>Age:</label>
//         <input id='age' name='age' type='number' ref={ageRef} />
//         <label htmlFor='email'>Электронная почта:</label>
//         <input id='email' name='email' type='email' ref={emailRef} />

//         <label htmlFor='password1'>Password:</label>
//         <input id='password1' name='password1' type='password' ref={pass1Ref} />
//         <label htmlFor='password2'>Password:</label>
//         <input id='password2' name='password2' type='password' ref={pass2Ref} />
//         <label htmlFor='gender'>Gender:</label>
//         <input id='gender' name='gender' ref={genderRef} />
//         <label htmlFor='termsAccepted'>Terms Accepted:</label>
//         <input id='termsAccepted' name='termsAccepted' type='checkbox' ref={acceptedRef} />
//         <label htmlFor='picture'>Picture:</label>
//         <input id='picture' name='picture' type='file' ref={pictureRef} />
//         <label htmlFor='country'>Country:</label>
//         <input id='country' name='country' ref={countryRef} />

//         <button type='submit'>Submit</button>
//       </form>
//     </>
//   );
// }

// export default UncontrolledForm;
// // // //
// // // //
// // // //
// // // //
// // // //

import { useRef, useState } from 'react';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null); // Указываем тип HTMLSelectElement
  const termsRef = useRef<HTMLInputElement | null>(null);
  const pictureRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Добавляем тип для errors

  const validate = () => {
    const newErrors: { [key: string]: string } = {}; // Добавляем тип для newErrors
    const name = nameRef.current!.value;
    const age = ageRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const confirmPassword = confirmPasswordRef.current!.value;
    const terms = termsRef.current!.checked;

    if (!/^[A-ZА-Я]/.test(name)) {
      newErrors.name = 'Имя должно начинаться с заглавной буквы';
    }

    if (!/^\d+$/.test(age) || +age <= 0) {
      newErrors.age = 'Возраст должен быть положительным числом';
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Неверный формат электронной почты';
    }

    if (password !== confirmPassword) {
      newErrors.password = 'Пароли должны совпадать';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      newErrors.password = 'Пароль должен содержать цифру, заглавную и строчную буквы, специальный символ';
    }

    if (!terms) {
      newErrors.terms = 'Необходимо принять условия и положения';
    }

    return newErrors;
    return newErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      // Отправка данных
      console.log('Форма отправлена');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Имя:</label>
        <input id='name' name='name' ref={nameRef} />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor='age'>Возраст:</label>
        <input id='age' name='age' type='number' ref={ageRef} />
        {errors.age && <p>{errors.age}</p>}
      </div>

      <div>
        <label htmlFor='email'>Электронная почта:</label>
        <input id='email' name='email' type='email' ref={emailRef} />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor='password'>Пароль:</label>
        <input id='password' name='password' type='password' ref={passwordRef} />
      </div>

      <div>
        <label htmlFor='confirmPassword'>Подтвердите пароль:</label>
        <input id='confirmPassword' name='confirmPassword' type='password' ref={confirmPasswordRef} />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <label htmlFor='gender'>Пол:</label>
        <select id='gender' name='gender' ref={genderRef}>
          <option value='male'>Мужской</option>
          <option value='female'>Женский</option>
        </select>
      </div>

      <div>
        <label htmlFor='terms'>
          <input id='terms' name='terms' type='checkbox' ref={termsRef} />
          Принять условия и положения
        </label>
        {errors.terms && <p>{errors.terms}</p>}
      </div>

      <div>
        <label htmlFor='picture'>Picture:</label>
        <input id='picture' name='picture' type='file' ref={pictureRef} />
        {errors.picture && <p>{errors.picture}</p>}
        <label htmlFor='country'>Country:</label>
        <input id='country' name='country' ref={countryRef} />
        {errors.country && <p>{errors.country}</p>}
      </div>

      <button type='submit'>Отправить</button>
    </form>
  );
}

export default UncontrolledForm;
