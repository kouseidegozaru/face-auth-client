import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'
import { UserInput } from '@/app/_components/input'
import { useState } from 'react'
import { CreateTrainingGroup } from '@/app/_requests/recongnizer'
import { SessionError, CsrfTokenError } from '@/app/_requests/modules'
import { useMessageModal } from '@/app/_components/MessageModal'
import { GroupPage } from '@/app/_links/recognizer'

export default function GroupRegisterMessage({ isOpen , closeButtonEvent }: { isOpen: boolean , closeButtonEvent: () => void }) {
    const [name, setName] = useState("")
    const [errors, setErrors] : any = useState({})
    const { showModal, Modal } = useMessageModal()

    // バリデーション
    const validate = (value) => {
        const newErrors : any = { ...errors }

        if (!value) {
            newErrors.name = "グループ名を入力してください"
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
                        <p className="m-[30px] text-sm font-bold">新規グループを作成します</p>
                        <UserInput
                            label="グループ名"
                            inputValue={name}
                            setInputValue={(value) => { setName(value); validate(value) }}
                            errorMessage={errors.name}
                            />
                        <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                                onClick={async () => {
                                    if (Object.keys(errors).length === 0 && name) {
                                        try {
                                            const response = await CreateTrainingGroup(name)
                                            if (response.ok) {
                                                setName("")
                                                GroupPage.Redirect()
                                            }
                                        } catch (e) {
                                            if (e instanceof SessionError) {
                                                showModal("ログインしてください", "error", 4000)
                                            } else if (e instanceof CsrfTokenError) {
                                                showModal("グループの作成に失敗しました", "error", 4000)
                                            } else {
                                                showModal("グループの作成に失敗しました", "error", 4000)
                                            }
                                        }
                                    }
                                }}>作成</Button>
                            </div>
                </Message>
            </OpenChildren>
            <Modal />
        </>
    )
}