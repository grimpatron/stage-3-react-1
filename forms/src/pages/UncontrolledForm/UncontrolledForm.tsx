import { useRef, useState } from 'react';
import schema from '../../components/schema';
import * as yup from 'yup';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);
  const pictureRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current ? nameRef.current.value : '',
      age: ageRef.current ? +ageRef.current.value : 0,
      email: emailRef.current ? emailRef.current.value : '',
      password: passwordRef.current ? passwordRef.current.value : '',
      confirmPassword: confirmPasswordRef.current ? confirmPasswordRef.current.value : '',
      gender: genderRef.current ? genderRef.current.value : '',
      termsAccepted: termsRef.current ? termsRef.current.checked : false,
      picture: pictureRef.current ? pictureRef.current.value : '',
      country: countryRef.current ? countryRef.current.value : '',
    };
    console.log(formData);
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log('Form submitted');
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const fieldErrors: { [key: string]: string } = {};
        validationError.inner.forEach(err => {
          if (err.path) {
            fieldErrors[err.path] = err.message;
          }
        });
        console.log(fieldErrors);
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit}>
        <div className='form__line'>
          <div className='form__input'>
            <label htmlFor='name'>Name:</label>
            <input id='name' name='name' ref={nameRef} />
          </div>
          {errors.name && <div className='form__error'>{errors.name}</div>}
        </div>

        <div className='form__line'>
          <div className='form__input'>
            <label htmlFor='age'>Age:</label>
            <input id='age' name='age' type='number' ref={ageRef} />
          </div>
          {errors.age && <div className='form__error'>{errors.age}</div>}
        </div>

        <div className='form__line'>
          <div className='form__input'>
            <label htmlFor='email'>Email:</label>
            <input id='email' name='email' type='email' ref={emailRef} />
          </div>
          {errors.email && <div className='form__error'>{errors.email}</div>}
        </div>

        <div className='form__line'>
          <div className='form__input'>
            <label htmlFor='password'>Password:</label>
            <input id='password' name='password' type='password' ref={passwordRef} />
          </div>
          {errors.password && <div className='form__error'>{errors.password}</div>}
        </div>

        <div className='form__line'>
          <div className='form__input'>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input id='confirmPassword' name='confirmPassword' type='password' ref={confirmPasswordRef} />
          </div>
          {errors.confirmPassword && <div className='form__error'>{errors.confirmPassword}</div>}
        </div>

        <div className='form__line'>
          <div className='form__input'>
            <label htmlFor='gender'>Gender:</label>
            <select id='gender' name='gender' ref={genderRef}>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
        </div>

        <div className='form__line'>
          <div className='form__input'>
            <label htmlFor='picture'>Picture:</label>
            <input id='picture' name='picture' type='file' ref={pictureRef} />
          </div>
          {errors.picture && <div className='form__error'>{errors.picture}</div>}
        </div>

        <div className='form__line'>
          <div className='form__input'>
            <label htmlFor='country'>Country:</label>
            <input id='country' name='country' ref={countryRef} />
          </div>
          {errors.country && <div className='form__error'>{errors.country}</div>}
        </div>
        
        <div className='form__line'>
          <div className='form__input'>
            <input id='terms' name='terms' type='checkbox' ref={termsRef} />
            <label htmlFor='terms'>Accept terms and conditions</label>
          </div>
          {errors.termsAccepted && <div className='form__error'>{errors.termsAccepted}</div>}
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default UncontrolledForm;
