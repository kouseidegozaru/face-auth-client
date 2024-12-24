function InputFactory({ isPassword } : { isPassword : boolean}){
    
    const CustomInput = ({ label, inputValue, setInputValue, errorMessage }) => {
        const onChange = (e) => {
            setInputValue(e.target.value)
        }
        return (
            <div className="w-[350px] h-auto bg-foreground">
                <p className="text-[11px] text-subtext ml-2 mb-1 font-bold">{label}</p>
                <input 
                    type={isPassword ? "password":"text"}
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

    return CustomInput

}

export const UserInput = InputFactory({isPassword: false})
export const PasswordInput = InputFactory({isPassword: true})