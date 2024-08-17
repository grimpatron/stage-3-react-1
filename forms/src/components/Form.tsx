import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormInterface, updateField } from '../redux/formSlice';

// import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';

const Form = () => {
  const { register, handleSubmit } = useForm<FormInterface>({
    // resolver: yupResolver(schema),
    resolver: async (values: FormInterface) => {
      yupResolver(schema);
      return {
        values,
        errors: {},
      };
    },
  });
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormInterface> = data => {
    console.log(data);

    Object.entries(data).forEach(([field, value]) => {
      if (field in data) {
        dispatch(updateField({ field: field as keyof FormInterface, value }));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='name'>Name:</label>
        <input {...register('name', { required: 'this field is Required' })} />
      </div>
      <div>
        <label htmlFor='age'>Age:</label>
        <input {...register('age')} />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input {...register('email')} type='email' />
      </div>
      <div>
        <label htmlFor='password1'>Password:</label>
        <input {...register('password1')} type='password' />
      </div>
      <div>
        <label htmlFor='password2'>Confirm Password:</label>
        <input {...register('password2')} type='password' />
      </div>
      <div>
        <label htmlFor='password2'>Confirm Password:</label>
        <input {...register('password2')} type='password' />
      </div>
      <div>
        <label htmlFor='gender'>Gender:</label>
        <input {...register('gender')} />
      </div>
      <div>
        <label htmlFor='termsAccepted'>Terms Accepted:</label>
        <input {...register('termsAccepted')} type='checkbox' />
      </div>
      <div>
        <label htmlFor='picture'>Picture:</label>
        <input {...register('picture')} type='file' />
      </div>
      <div>
        <label htmlFor='country'>Country:</label>
        <input {...register('country')} />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
