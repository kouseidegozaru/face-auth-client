import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'
import { Train } from '@/app/_requests/recongnizer'
import { SessionError , CsrfTokenError } from '@/app/_requests/modules'
import { useMessageModal } from '@/app/_components/MessageModal'
import { useState } from 'react'
import { GroupDataPage } from '@/app/_links/recognizer'
import Loading from '@/app/_components/loading'

export default function LearningMessage({ isOpen , closeButtonEvent , group_id }: { isOpen: boolean , closeButtonEvent: () => void , group_id: string }) {
    const { showModal , Modal } = useMessageModal()
    const [isComplete , setIsComplete] = useState(false)
    const [loading , setLoading] = useState(false)
    const group_name = "test"

    return (
        <OpenChildren isOpen={isOpen}>
            {!isComplete ? (
                <Message closeButtonEvent={closeButtonEvent}>
                    <div className='h-full w-full flex items-center flex-col justify-center text-text'>
                        <p className="m-[30px] text-sm font-bold">画像データを学習します。</p>
                        <p className="m-[30px] text-sm">グループ名：{group_name}</p>
                        {!loading ? (
                            <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                                onClick={async () => {
                                    // ローディング開始
                                    setLoading(true)
                                    try {
                                        const response = await Train(group_id)
                                        if (response.ok) {
                                            setIsComplete(true)
                                        } else if (response.status === 400) {
                                            showModal("学習グループがありません", "error", 4000)
                                        } else if (response.status === 412) {
                                            showModal("画像を2つ以上登録してください", "error", 4000)
                                        } else {
                                            showModal("画像の学習に失敗しました", "error", 4000)
                                        }
                                    } catch (e) {
                                        if (e instanceof SessionError) {
                                            showModal("ログインしてください", "error", 4000)
                                        } else if (e instanceof CsrfTokenError) {
                                            showModal("画像の学習に失敗しました", "error", 4000)
                                        } else {
                                            showModal("画像の学習に失敗しました", "error", 4000)
                                        }
                                    } finally {
                                        // ローディング終了
                                        setLoading(false)
                                    }
                                }}>開始</Button>
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
                        <p className="m-[30px] text-sm font-bold">画像の学習が完了しました</p>
                        <p className="m-[30px] text-sm">グループ名：{group_name}</p>
                        <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                            onClick={() => GroupDataPage.Redirect({ linkKey: group_id })}>OK</Button>
                    </div>
                </Message>
            )}
            <Modal />
        </OpenChildren>
    )
}