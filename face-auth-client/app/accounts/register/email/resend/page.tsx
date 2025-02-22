'use client'

import { useState } from "react"
import { Button } from "../../../../_components/buttons"
import { resendRegistrationEmail } from "../../../../_requests/accounts"
import { useMessageModal } from "../../../../_components/MessageModal"
import Loading from "../../../../_components/loading"
import { UserInput } from "../../../../_components/input"


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
            default:
                break
        }

        setErrors(newErrors)
    }

    return (
        <div className="w-full h-[calc(100%-50px)] flex flex-col items-center justify-center">
            <div className="w-full h-[77%] flex flex-col items-center justify-evenly">
                <p className="text-sm font-bold m-4">メールアドレス確認メールを再送信します</p>
                <UserInput 
                    label="メールアドレス" 
                    inputValue={email} 
                    setInputValue={(value) => { setEmail(value); validate("email", value) }} 
                    errorMessage={errors.email} 
                />
                {!loading &&
                    <Button 
                        className="w-[350px] h-[50px] text-sm text-foreground bg-primary1 hover:bg-primary1_hover" 
                        onClick={async () => {
                            if (Object.keys(errors).length === 0 && email) {
                                // ローディング表示
                                setLoading(true)
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
                                } finally {
                                    // ローディング非表示
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
            </div>
            <Modal />
        </div>
    );
}
