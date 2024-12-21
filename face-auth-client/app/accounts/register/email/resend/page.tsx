'use client'

import { useState } from "react"
import { Button } from "../../../../_components/buttons"
import { resendRegistrationEmail } from "../../../../_requests/accounts"
import { useMessageModal } from "../../../../_components/MessageModal"


export default function Page() {
    return (
        <>
            <Header />
            <ContentContainer />
        </>
    );
}

const Header = () => {
    return (
        <div className="bg-foreground h-[50px] w-full border-b border-line flex items-center">
            <h4 className="ml-[30px] font-bold">メール再送信</h4>
        </div>
    );
}

const ContentContainer = () => {
    const [email, setEmail] = useState("")
    const [errors, setErrors] : any = useState({})
    const { showModal , Modal } = useMessageModal()

    // バリデーション
    const validate = (field, value) => {
        const newErrors : any = { ...errors }

        // フィールドごとのバリデーション
        switch (field) {
            case "email":
                if (!value) {
                    newErrors.email = "メールアドレスを入力してください"
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = "有効なメールアドレスを入力してください"
                } else {
                    delete newErrors.email
                }
                break
            default:
                break
        }

        setErrors(newErrors)
    }

    return (
        <div className="w-full h-[calc(100%-50px)] flex flex-col items-center justify-center">
            <div className="w-full h-[77%] flex flex-col items-center justify-evenly">
                <p className="text-sm font-bold m-4">メールアドレス確認メールを再送信します</p>
                <CustomInput 
                    label="メールアドレス" 
                    inputValue={email} 
                    setInputValue={(value) => { setEmail(value); validate("email", value) }} 
                    errorMessage={errors.email} 
                />
                <Button 
                    className="w-[350px] h-[50px] text-sm text-foreground bg-primary1 hover:bg-primary1_hover" 
                    onClick={async () => {
                        if (Object.keys(errors).length === 0 && email) {
                            try {
                                // メール再送信
                                await resendRegistrationEmail(email).then((res) => {
                                    if (res.ok) {
                                        // メール再送信完了メッセージ
                                        showModal("メールを送信しました", "success")
                                    } else if (res.status === 400) {
                                        showModal("メールアドレスが登録されていません", "error")
                                    } else {
                                        showModal("ユーザー登録に失敗しました", "error")
                                    }
                                })

                            } catch (error) {
                                showModal("ユーザー登録に失敗しました", "error")
                            }

                        } else {
                            showModal("正しい情報を入力してください", "error");
                        }
                    }}
                >
                    完了
                </Button>
            </div>
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
