"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"
import { DynamicIcon } from "lucide-react/dynamic"

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {

  const [isShow, setIsShow] = React.useState(false)

  return <>
    <div className=" relative">
      <InputPrimitive
        type={type == 'password' ? isShow ? 'text' : 'password' : type}
        data-slot="input"
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-blue-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />

      {type == 'password' ? <button onClick={() => { setIsShow(!isShow) }} type="button" className="btn-show bg-transparent p-2 cursor-pointer absolute bottom-0 right-2" >
        <DynamicIcon name={isShow ? 'eye' : 'eye-off'} strokeWidth={'1.5px'} />
      </button> : ''}
    </div>
  </>
}

export { Input }
