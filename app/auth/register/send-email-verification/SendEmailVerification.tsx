// "use client"

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useFormContext } from "react-hook-form"

import type { FormValues } from "../page"

export default function SendEmailVerification() {

    const {
        register,
        formState: { errors },
    } = useFormContext<FormValues>()


    return <>

        <div className="mb-7">
            <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="input-field-email" className='capitalize'>email</FieldLabel>
                <Input
                    id="input-field-email"
                    type="text"
                    placeholder="Enter your email"
                    className='py-5 '
                    {...register("email")}
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <FieldError className='capitalize'>
                        {errors.email.message}
                    </FieldError>
                )}
            </Field>
        </div>
    </>
}
