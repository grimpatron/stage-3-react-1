import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInterface } from '../redux/formSlice';

import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';

import './Form.css';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<FormInterface> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='name'>Name:</label>
          <input {...register('name')} />
        </div>
        <div className='form__error'>{errors.name?.message}</div>
      </div>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='age'>Age:</label>
          <input {...register('age')} />
        </div>
        <div className='form__error'>{errors.age?.message}</div>
      </div>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='email'>Email:</label>
          <input {...register('email')} type='email' />
        </div>
        <div className='form__error'>{errors.email?.message}</div>
      </div>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='password1'>Password:</label>
          <input {...register('password')} type='password' />
        </div>
        <div className='form__error'>{errors.password?.message}</div>
      </div>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='password2'>Confirm Password:</label>
          <input {...register('confirmPassword')} type='password' />
        </div>
        <div className='form__error'>{errors.confirmPassword?.message}</div>
      </div>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='gender'>Gender:</label>
          <select {...register('gender')}>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
        <div className='form__error'>{errors.gender?.message}</div>
      </div>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='picture'>Picture:</label>
          <input {...register('picture')} type='file' />
        </div>
        <div className='form__error'>{errors.picture?.message}</div>
      </div>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='country'>Country:</label>
          <input {...register('country')} />
        </div>
        <div className='form__error'>{errors.country?.message}</div>
      </div>
      <div className='form__line'>
        <div className='form__input'>
          <label htmlFor='termsAccepted'>Accept terms and conditions</label>
          <input {...register('termsAccepted')} type='checkbox' />
        </div>
        <div className='form__error'>{errors.termsAccepted?.message}</div>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
