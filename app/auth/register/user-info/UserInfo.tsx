import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FormValues } from '../page'
import { useFormContext } from 'react-hook-form'

export default function UserInfo() {

  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<FormValues>()


  return <>

    <div className="grid grid-cols-2 gap-4">
      <div className="mb-7">
        <Field data-invalid={!!errors.firstName}>
          <FieldLabel htmlFor="input-field-firstName" className='capitalize'>first name</FieldLabel>
          <Input
            id="input-field-firstName"
            type="text"
            placeholder="Enter your first name"
            className='py-5 '
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <FieldError className='capitalize'>
              {errors.firstName.message}
            </FieldError>
          )}
        </Field>
      </div>

      <div className="mb-7">
        <Field data-invalid={!!errors.lastName}>
          <FieldLabel htmlFor="input-field-lastName" className='capitalize'>last name</FieldLabel>
          <Input
            id="input-field-lastName"
            type="text"
            placeholder="Enter your last name"
            className='py-5 '
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <FieldError className='capitalize'>
              {errors.lastName.message}
            </FieldError>
          )}
        </Field>
      </div>
    </div>

    <div className="mb-7">
      <Field data-invalid={!!errors.username}>
        <FieldLabel htmlFor="input-field-username" className='capitalize'>username</FieldLabel>
        <Input
          id="input-field-username"
          type="text"
          placeholder="Enter your username"
          className='py-5'
          {...register("username")}
          autoComplete='username'
          aria-invalid={!!errors.username}
        />
        {errors.username && (
          <FieldError className='capitalize'>
            {errors.username.message}
          </FieldError>
        )}
      </Field>
    </div>

    <div className="mb-7">
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="input-field-email" className='capitalize'>email</FieldLabel>
        <Input
          disabled={true}
          id="input-field-email"
          type="email"
          placeholder="Enter your email"
          className='py-5 '
          value={getValues('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <FieldError className='capitalize'>
            {errors.email.message}
          </FieldError>
        )}
      </Field>
    </div>

    <div className="mb-7">
      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="input-field-password" className='capitalize'>password</FieldLabel>
        <Input
          id="input-field-password"
          type="password"
          placeholder="Enter your password"
          className='py-5 '
          {...register("password")}
          autoComplete='new-password'
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <FieldError className='capitalize'>
            {errors.password.message}
          </FieldError>
        )}
      </Field>
    </div>

    <div className="mb-7">
      <Field data-invalid={!!errors.confirmPassword}>
        <FieldLabel htmlFor="input-field-confirmPassword" className='capitalize'>confirm Password</FieldLabel>
        <Input
          id="input-field-confirmPassword"
          type="password"
          placeholder="Enter your confirm Password"
          className='py-5 '
          {...register("confirmPassword")}
          autoComplete='new-password'
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <FieldError className='capitalize'>
            {errors.confirmPassword.message}
          </FieldError>
        )}
      </Field>
    </div>

    <div className="mb-7">
      <Field data-invalid={!!errors.phone}>
        <FieldLabel htmlFor="input-field-phone" className='capitalize'>phone</FieldLabel>
        <Input
          id="input-field-phone"
          type="tel"
          placeholder="Enter your phone"
          className='py-5 '
          {...register("phone")}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <FieldError className='capitalize'>
            {errors.phone.message}
          </FieldError>
        )}
      </Field>
    </div>
  </>
}
