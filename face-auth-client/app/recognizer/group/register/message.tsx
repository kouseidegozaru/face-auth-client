import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'
import { UserInput } from '@/app/_components/input'
import { useState } from 'react'

export default function GroupRegisterMessage({ isOpen , closeButtonEvent }: { isOpen: boolean , closeButtonEvent: () => void }) {
    const [name, setName] = useState("")
    const [errors, setErrors] : any = useState({})

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
                    <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground">作成</Button>
                </div>
            </Message>
        </OpenChildren>
    )
}