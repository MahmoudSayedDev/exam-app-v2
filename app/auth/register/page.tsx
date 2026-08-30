"use client"

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper"
import { DynamicIcon } from 'lucide-react/dynamic'
import SendEmailVerification from './send-email-verification/SendEmailVerification'
import ConfirmEmailVerification from './confirm-email-verification/ConfirmEmailVerification'
import UserInfo from './user-info/UserInfo'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import VALIDATION_PATTERNS from '../validators/patterns'
import axiosInstance from "@/lib/axios"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"


const schema = z.object({
  username: z.string().nonempty('username is required'),
  email: z.string().regex(VALIDATION_PATTERNS.email.regex, VALIDATION_PATTERNS.email.message),
  password: z.string().regex(VALIDATION_PATTERNS.password.regex, VALIDATION_PATTERNS.password.message),
  confirmPassword: z.string().nonempty('confirm password is required'),
  firstName: z.string().nonempty('first name is required'),
  lastName: z.string().nonempty('last name is required'),
  phone: z.string().regex(VALIDATION_PATTERNS.phone.regex, VALIDATION_PATTERNS.phone.message),

  code: z.string().min(6, 'OTP is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type FormValues = z.infer<typeof schema>;

export default function Register() {

  const [currentStep, setCurrentStep] = useState(1)
  const [isStepSubmitting, setIsStepSubmitting] = useState(false)

  const router = useRouter()

  const steps = [
    {
      title: 'Send Email',
      com: <SendEmailVerification />,
      fields: ["email"] as const,
    },
    {
      title: 'Confirm Email',
      com: <ConfirmEmailVerification />,
      fields: [
        "email",
        "code"
      ] as const,
    },
    {
      title: 'User Info',
      com: <UserInfo />,
      fields: [
        "username",
        "password",
        "confirmPassword",
        "firstName",
        "lastName",
        "phone",
      ] as const,
    },
  ]

  const registerForm = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",

      code: "",
    },
    mode: "onTouched",
  })

  const handleStepSubmit = async (step: number) => {

    try {
      setIsStepSubmitting(true)

      const currentStep = steps[step - 1]
      const isValid = await registerForm.trigger(currentStep.fields)

      if (!isValid) {
        return
      }

      // Step 1
      if (step === 1) {

        const email = registerForm.getValues("email")

        const { data } = await axiosInstance.post("/auth/send-email-verification", {
          email,
        })

        toast.add({
          type: "success",
          title: data.message,
        })

        setCurrentStep((prev) => prev + 1)
        return
      }

      // Step 2
      if (step === 2) {

        const email = registerForm.getValues("email")
        const code = registerForm.getValues("code")

        const { data } = await axiosInstance.post("/auth/confirm-email-verification", {
          email,
          code,
        })

        toast.add({
          type: "success",
          title: data.message,
        })

        setCurrentStep((prev) => prev + 1)
        return
      }

      // Step 3 
      if (step === 3) {
        await registerForm.handleSubmit(onSubmit)()
      }
    } catch (err: any) {
      toast.add({
        type: "error",
        title: err.response.data.message || "Failed to send verification email",
      })
    } finally {
      setIsStepSubmitting(false)
    }
  }

  async function onSubmit() {
    try {
      const dataToSend = {
        username: registerForm.getValues("username"),
        email: registerForm.getValues("email"),
        password: registerForm.getValues("password"),
        confirmPassword: registerForm.getValues("confirmPassword"),
        firstName: registerForm.getValues("firstName"),
        lastName: registerForm.getValues("lastName"),
        phone: registerForm.getValues("phone"),
      } as FormValues

      const { data } = await axiosInstance.post("/auth/register", dataToSend)

      registerForm.reset()
      router.push('/auth/login')
      
      toast.add({
        type: "success",
        title: 'Account Created Successfuly'
      })
    } catch (err: any) {
      toast.add({
        type: "error",
        title:
          err?.response?.data?.message ||
          "Something went wrong",
      })
    }
  }


  return <>
    <FormProvider {...registerForm}>
      <Stepper
        className="w-full space-y-8"
        value={currentStep} onValueChange={setCurrentStep}
        indicators={{
          completed: (
            // <CheckIcon className="size-3.5" />
            <DynamicIcon name="check" size='16px' strokeWidth={'2px'} />
          ),
          loading: (
            <DynamicIcon name="loader-circle" size='16px' strokeWidth={'2px'} className=' animate-spin' />
          ),
        }}
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem
              disabled={false}
              completed={steps.indexOf(step) == (index + 1)}
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator className='data-[state=active]:bg-blue-500 data-[state=completed]:bg-blue-500'>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-blue-500 absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel>
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className=""
            >

              <form onSubmit={(e) => { e.preventDefault() }} >
                <h4 className=" font-bold text-4xl capitalize my-15">Create Account</h4>

                {step.com}

                <Button
                  type="submit"
                  className='w-full py-5 capitalize'
                  onClick={() => handleStepSubmit(index + 1)}
                  disabled={isStepSubmitting}
                >
                  <span>{index + 1 === 3 ? 'register' : 'next'}</span>
                  {isStepSubmitting ? <DynamicIcon name="loader-circle" strokeWidth={'3px'} className=' animate-spin' /> : ''}
                </Button>
              </form>

            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    </FormProvider>
  </>
}
