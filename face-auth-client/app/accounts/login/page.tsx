'use client'

import { useState } from "react"
import { Button } from "../../_components/buttons"
import { loginUser } from "../../_requests/accounts"
import { useMessageModal } from "../../_components/MessageModal"
import { GroupPage } from "../../_links/recognizer"
import Loading from "../../_components/loading"
import { SetSessionToken } from "../../_requests/cookie"
import { UserInput , PasswordInput } from "@/app/_components/input"

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
            <h4 className="ml-[30px] font-bold">ログイン</h4>
        </div>
    );
}

const ContentContainer = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] : any = useState({})
    const { showModal , Modal } = useMessageModal()
    const [loading, setLoading] = useState(false)

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
            case "password":
                if (!value) {
                    newErrors.password = "パスワードを入力してください"
                } else {
                    delete newErrors.password
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
                <UserInput 
                    label="メールアドレス" 
                    inputValue={email} 
                    setInputValue={(value) => { setEmail(value); validate("email", value) }} 
                    errorMessage={errors.email} 
                />
                <PasswordInput 
                    label="パスワード" 
                    inputValue={password} 
                    setInputValue={(value) => { setPassword(value); validate("password", value) }} 
                    errorMessage={errors.password} 
                />
                {!loading &&
                    <Button 
                        className="w-[350px] h-[50px] text-sm text-foreground bg-primary1 hover:bg-primary1_hover" 
                        onClick={async () => {
                            if (Object.keys(errors).length === 0 && email && password) {
                                // ローディング開始
                                setLoading(true)
                                try {
                                    // ログイン処理
                                    await loginUser(email, password).then(async (res) => {
                                        if (res.ok) {
                                            // データの取得
                                            const data = await res.json()
                                            // セッショントークンをセット
                                            await SetSessionToken(data.key)
                                            // グループページへ遷移
                                            GroupPage.Redirect()
                                        } else if (res.status === 400) {
                                            showModal("メールアドレスまたはパスワードが違います", "error")
                                        } else {
                                            showModal("ログインに失敗しました", "error")
                                        }
                                    })

                                } catch (error) {
                                    showModal("ログインに失敗しました", "error")
                                } finally {
                                    // ローディング終了
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
                <Loading disabled={!loading} />
            </div>
            <Modal />
        </div>
    );
}
