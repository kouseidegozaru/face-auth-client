'use client'

import { useState } from "react"
import { Button } from "../../_components/buttons"
import { registerUser } from "../../_requests/accounts"
import { RegisterEmailSendPage } from "../../_links/accounts"
import { useMessageModal } from "../../_components/MessageModal"
import Loading from "../../_components/loading"

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
            <h4 className="ml-[30px] font-bold">新規登録</h4>
        </div>
    );
}

const ContentContainer = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [errors, setErrors] : any = useState({})
    const [loading, setLoading] = useState(false)
    const {showModal, Modal} = useMessageModal()

    // バリデーション
    const validate = (field, value) => {
        const newErrors : any = { ...errors }

        // フィールドごとのバリデーション
        switch (field) {
            case "username":
                if (!value) {
                    newErrors.username = "ユーザー名を入力してください"
                } else {
                    delete newErrors.username
                }
                break
            case "email":
                if (!value) {
                    newErrors.email = "メールアドレスを入力してください"
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = "有効なメールアドレスを入力してください"
                } else {
                    delete newErrors.email
                }
                break
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
            <CustomInput 
                label="ユーザー名" 
                inputValue={username} 
                setInputValue={(value) => { setUsername(value); validate("username", value) }} 
                errorMessage={errors.username} 
            />
            <CustomInput 
                label="メールアドレス" 
                inputValue={email} 
                setInputValue={(value) => { setEmail(value); validate("email", value) }} 
                errorMessage={errors.email} 
            />
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
            {!loading &&
                <Button 
                    className="w-[350px] h-[50px] text-sm text-foreground bg-primary1 hover:bg-primary1_hover" 
                    onClick={async () => {
                        if (Object.keys(errors).length === 0 && username && email && password1 && password2) {
                            // ボタンをロード中に変更
                            setLoading(true)
                            
                            // ユーザー登録リクエストの送信
                            try {
                                await registerUser(username, email, password1, password2).then((res) => {   
                                    if (res.ok) {
                                        // メール送信完了メッセージへリダイレクト
                                        RegisterEmailSendPage.Redirect()
                                    } else if (res.status === 400) {
                                        showModal("既に登録済みです", "error")
                                    } else if (res.status === 409) {
                                        showModal("既に送信済みです", "success")
                                    } else {
                                        showModal("ユーザー登録に失敗しました", "error")
                                    }
                                })

                            } catch (error) {
                                showModal("ユーザー登録に失敗しました", "error")
                            } finally {
                                // ボタンをロード中から通常に戻す
                                setLoading(false)
                            }

                        } else {
                            showModal("正しい情報を入力してください", "error");
                        }
                    }}
                >
                    完了
                </Button>
            }
            <Loading disabled={!loading}/>
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
