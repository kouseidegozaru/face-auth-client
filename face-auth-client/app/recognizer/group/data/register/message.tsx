import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'
import { UserInput } from '@/app/_components/input'
import { useState } from 'react'
import { CreateTrainingData } from '@/app/_requests/recongnizer'
import { SessionError, CsrfTokenError } from '@/app/_requests/modules'
import { useMessageModal } from '@/app/_components/MessageModal'
import { GroupDataPage } from '@/app/_links/recognizer'
import Loading from '@/app/_components/loading'

export default function GroupRegisterMessage({ isOpen , closeButtonEvent , group_id }: { isOpen: boolean , closeButtonEvent: () => void , group_id: string }) {
    const [name, setName] = useState("")
    const [errors, setErrors] : any = useState({})
    const { showModal, Modal } = useMessageModal()
    const [loading, setLoading] = useState(false)

    // バリデーション
    const validate = (value) => {
        const newErrors : any = { ...errors }

        if (!value) {
            newErrors.name = "画像ラベルを入力してください"
        } else {
            delete newErrors.name
        }

        setErrors(newErrors)
    }
    
    return (
        <>
            <OpenChildren isOpen={isOpen}>
                <Message closeButtonEvent={closeButtonEvent}>
                    <div className='h-full w-full flex items-center flex-col justify-center'>
                        <p className="m-[30px] text-sm font-bold">新規データを登録します</p>
                        <UserInput
                            label="ラベル名"
                            inputValue={name}
                            setInputValue={(value) => { setName(value); validate(value) }}
                            errorMessage={errors.name}
                            />
                        {!loading ? (
                            <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                                    onClick={async () => {
                                        if (Object.keys(errors).length === 0 && name) {
                                            // ローディング開始
                                            setLoading(true)
                                            try {
                                                const response = await CreateTrainingData(group_id, name)
                                                if (response.ok) {
                                                    setName("")
                                                    GroupDataPage.Redirect({linkKey: group_id})
                                                }
                                            } catch (e) {
                                                if (e instanceof SessionError) {
                                                    showModal("ログインしてください", "error", 4000)
                                                } else if (e instanceof CsrfTokenError) {
                                                    showModal("データの登録に失敗しました", "error", 4000)
                                                } else {
                                                    showModal("データの登録に失敗しました", "error", 4000)
                                                }
                                            } finally {
                                                // ローディング終了
                                                setLoading(false)
                                            }
                                        }
                                    }}>
                                作成
                            </Button>
                        ) : (
                            <div className='m-[33px]'>
                                <Loading disabled={!loading}/>
                            </div>
                        )}
                    </div>
                </Message>
            </OpenChildren>
            <Modal />
        </>
    )
}