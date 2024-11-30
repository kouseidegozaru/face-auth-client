// button.tsx
import React from 'react'
import { twMerge } from "tailwind-merge"

type Props = {
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  className = '',
  ...props 
}: Props) => {
  return (
    <button
      className={twMerge(
        'w-[60px] h-[30px] bg-foreground hover:bg-foreground_hover flex items-center justify-center text-[14px] font-default font-bold py-2 px-2 rounded border-2 border-line rounded-md',
        className,
      )}
      {...props}
    >
      { children }
    </button>
  );
}
