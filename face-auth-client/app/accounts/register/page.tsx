'use client'

import { useState } from "react"
import { Button } from "../../_components/buttons"


const Header = () => {
    return (
        <div className="bg-foreground h-[50px] w-full border-b border-line flex items-center">
            <h4 className="ml-[30px] font-bold">新規登録</h4>
        </div>
    );
}


const CustomInput = ({ label, inputValue, setInputValue, errorMessage }) => {
    const onChange = (e) => {
        setInputValue(e.target.value)
    }
    return (
        <div className="w-[350px] h-auto bg-foreground">
            <p className="text-[11px] text-subtext ml-2 mb-1 font-bold">{label}</p>
            <input 
                type="text" 
                value={inputValue} 
                onChange={onChange} 
                className={`w-full h-[40px] bg-foreground rounded-[10px] border px-2 text-[14px] ${
                    errorMessage ? "border-error" : "border-line"
                }`} 
            />
            {errorMessage && <p className="text-error text-xs mt-1 ml-2">{errorMessage}</p>}
        </div>
    );
}
