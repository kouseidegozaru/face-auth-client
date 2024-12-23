'use client'

import React,{ useState , useEffect } from "react"
import { Button } from "../../../../../_components/buttons"
import { confirmPasswordReset } from "../../../../../_requests/accounts"
import { useMessageModal } from "../../../../../_components/MessageModal"
import { PasswordResetVerifyPage } from "@/app/_links/accounts"

export default function Page({ params }: { params: Promise<{ uid: string; token: string; }> }) {
    const { uid, token } = React.use(params)
    return (
        <>
            <Header />
            <ContentContainer uid={uid} token={token}/>
        </>
    );
}

const Header = () => {
    return (
        <div className="bg-foreground h-[50px] w-full border-b border-line flex items-center">
            <h4 className="ml-[30px] font-bold">パスワード変更</h4>
        </div>
    );
}

const ContentContainer = ({uid, token}) => {
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const { showModal , Modal } = useMessageModal()
    const [errors, setErrors] : any = useState({})

    // バリデーション
    const validate = (field, value) => {
        const newErrors : any = { ...errors }

        // フィールドごとのバリデーション
        switch (field) {
            case "password1":
                if (!value) {
                    newErrors.password1 = "パスワードを入力してください"
                } else if (value.length < 8) {
                    newErrors.password1 = "パスワードは8文字以上にしてください"
                } else {
                    delete newErrors.password1
                }
                break
            case "password2":
                if (!value) {
                    newErrors.password2 = "パスワードを入力してください"
                } else if (value !== password1) {
                    newErrors.password2 = "パスワードが一致しません"
                } else {
                    delete newErrors.password2
                }
                break
            default:
                break
        }

        setErrors(newErrors)
    }

    return (
        <div className="w-full h-[calc(100%-50px)] flex flex-col items-center justify-evenly">
            <p className="text-sm font-bold m-4">新しいパスワードを入力してください</p>
            <CustomInput 
                label="パスワード" 
                inputValue={password1} 
                setInputValue={(value) => { setPassword1(value); validate("password1", value) }} 
                errorMessage={errors.password1} 
            />
            <CustomInput 
                label="パスワード(確認用)" 
                inputValue={password2} 
                setInputValue={(value) => { setPassword2(value); validate("password2", value) }} 
                errorMessage={errors.password2} 
            />
            <Button 
                className="w-[350px] h-[50px] text-sm text-foreground bg-primary1 hover:bg-primary1_hover" 
                onClick={async () => {
                    if (Object.keys(errors).length === 0 && password1 && password2) {
                        try {
                            await confirmPasswordReset(uid, token, password1, password2).then((res) => {
                                if (res.ok) {
                                    // 完了ページへ遷移
                                    PasswordResetVerifyPage.Redirect()
                                } else if (res.status === 400) {
                                    showModal("パスワードの変更に失敗しました", "error")
                                } else {
                                    showModal("エラーが発生しました", "error")
                                }
                            })
                        } catch {
                            showModal("エラーが発生しました", "error")
                        }
                    } else {
                        showModal("正しい情報を入力してください", "error")
                    }
                }}
            >
                完了
            </Button>
            <Modal />
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
