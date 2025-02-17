import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'
import { DeleteTrainingData } from '@/app/_requests/recongnizer'
import { SessionError , CsrfTokenError } from '@/app/_requests/modules'
import { useMessageModal } from '@/app/_components/MessageModal'
import { useState } from 'react'
import { GroupDataPage } from '@/app/_links/recognizer'
import Loading from '@/app/_components/loading'

export default function DataDeleteMessage({ isOpen , closeButtonEvent , group_id , data_id , label }: { isOpen: boolean , closeButtonEvent: () => void , group_id: string , data_id: string , label: string }) {
    const { showModal , Modal } = useMessageModal()
    const [isComplete , setIsComplete] = useState(false)
    const [loading , setLoading] = useState(false)

    return (
        <OpenChildren isOpen={isOpen}>
            {!isComplete ? (
                <Message closeButtonEvent={closeButtonEvent}>
                    <div className='h-full w-full flex items-center flex-col justify-center text-text'>
                        <p className="m-[30px] text-sm font-bold">画像を削除します</p>
                        <p className="m-[30px] text-sm">ラベル：{label}</p>
                        {!loading ? (
                            <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                                onClick={async () => {
                                    // ローディング開始
                                    setLoading(true)
                                    try {
                                        const response = await DeleteTrainingData(data_id)
                                        if (response.ok) {
                                            setIsComplete(true)
                                        } else {
                                            showModal("画像の削除に失敗しました", "error", 4000)
                                        }
                                    } catch (e) {
                                        if (e instanceof SessionError) {
                                            showModal("ログインしてください", "error", 4000)
                                        } else if (e instanceof CsrfTokenError) {
                                            showModal("画像の削除に失敗しました", "error", 4000)
                                        } else {
                                            showModal("画像の削除に失敗しました", "error", 4000)
                                        }
                                    } finally {
                                        // ローディング終了
                                        setLoading(false)
                                    }
                                }}>削除</Button>
                        ) : (
                            <div className="m-[33px]">
                                <Loading disabled={!loading}/>
                            </div>
                        )}
                    </div>
                </Message>
            ) : (
                <Message closeButtonEvent={() => GroupDataPage.Redirect({ linkKey: group_id })}>
                    <div className='h-full w-full flex items-center flex-col justify-center text-text'>
                        <p className="m-[30px] text-sm font-bold">画像の削除が完了しました</p>
                        <p className="m-[30px] text-sm">ラベル：{label}</p>
                        <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                            onClick={() => GroupDataPage.Redirect({ linkKey: group_id })}>OK</Button>
                    </div>
                </Message>
            )}
            <Modal />
        </OpenChildren>
    )
}