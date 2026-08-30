import { Controller, useFormContext } from "react-hook-form"

import type { FormValues } from "../page"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Field, FieldError } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"


export default function ConfirmEmailVerification() {

  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<FormValues>()

  return <>
    <h4 className=" font-bold text-3xl capitalize mb-2 text-primary">Verify OTP</h4>

    <p className="text-sm text-muted-foreground">Please enter the 6-digits code we have sent to: <br /> <span className="text-primary">{getValues("email")}</span></p>

    <div className="my-7 flex justify-center">
      <Controller
        name="code"
        render={({ field }) => (
          <Field data-invalid={!!errors.code} className="w-fit">
            <InputOTP
              id="digits-only"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} aria-invalid={!!errors.code} className="size-12 text-xl"/>
                <InputOTPSlot index={1} aria-invalid={!!errors.code} className="size-12 text-xl"/>
                <InputOTPSlot index={2} aria-invalid={!!errors.code} className="size-12 text-xl"/>
                <InputOTPSlot index={3} aria-invalid={!!errors.code} className="size-12 text-xl"/>
                <InputOTPSlot index={4} aria-invalid={!!errors.code} className="size-12 text-xl"/>
                <InputOTPSlot index={5} aria-invalid={!!errors.code} className="size-12 text-xl"/>
              </InputOTPGroup>
            </InputOTP>
            {errors.code && (
              <FieldError className='capitalize'>
                {errors.code.message}
              </FieldError>
            )}
          </Field>
        )}
      />
    </div>
  </>
}
