"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import VALIDATION_PATTERNS from './../validators/patterns';
import axiosInstance from '@/lib/axios'
import { DynamicIcon } from 'lucide-react/dynamic'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"


const schema = z.object({
  username: z.string().nonempty('username is required'),
  password: z.string().regex(VALIDATION_PATTERNS.password.regex, VALIDATION_PATTERNS.password.message)
});

type FormValues = z.infer<typeof schema>;

export default function Login() {

  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {    
    try {
      const { data } = await axiosInstance.post('/auth/login', values)

      const token = data.payload.token
      Cookies.set("token", token)

      router.push('/')
      
      toast.add({
        type: 'success',
        title: <><span className='capitalize'>welcome {data.payload.user.firstName}</span></>
      })

    } catch (err: any) {
      toast.add({
        type: 'error',
        title: err.response.data.message
      })
    }

  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <h4 className=" font-bold text-4xl capitalize mb-15">login</h4>

      <div className="mb-7">
        <Field data-invalid={!!form.formState.errors.username}>
          <FieldLabel htmlFor="input-field-username" className='capitalize'>Username</FieldLabel>
          <Input
            id="input-field-username"
            type="text"
            placeholder="Enter your username"
            className='py-5 '
            {...form.register("username")}
            aria-invalid={!!form.formState.errors.username}
          />
          {form.formState.errors.username && (
            <FieldError className='capitalize'>
              {form.formState.errors.username.message}
            </FieldError>
          )}
        </Field>
      </div>

      <div className="mb-7">
        <Field data-invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="input-field-password" className='capitalize'>password</FieldLabel>
          <Input
            id="input-field-password"
            type="password"
            placeholder="Enter your password"
            className='py-5 '
            {...form.register("password")}
            aria-invalid={!!form.formState.errors.password}
          />
          {form.formState.errors.password && (
            <FieldError className='capitalize'>
              {form.formState.errors.password.message}
            </FieldError>
          )}
        </Field>

        <div className=' flex justify-end text-primary font-medium text-sm hover:underline'>
          <Link href={''} className='mt-2'>Forgot your password?</Link>
        </div>
      </div>

      <Button
        type="submit"
        className='w-full py-5 capitalize'
        disabled={form.formState.isSubmitting}
      >
        <span>login</span>
        {form.formState.isSubmitting ? <DynamicIcon name="loader-circle" strokeWidth={'3px'} className=' animate-spin' /> : ''}
      </Button>

      <div className='mt-7 text-sm flex justify-center items-center gap-2'>
        <span>Don’t Have An Account?</span>
        <Link href='/auth/register' className='text-primary font-medium hover:underline'>Create Yours</Link>
      </div>
    </form>
  )
}
