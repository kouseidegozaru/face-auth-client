import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'
import { DeleteTrainingGroup } from '@/app/_requests/recongnizer'
import { SessionError , CsrfTokenError } from '@/app/_requests/modules'
import { useMessageModal } from '@/app/_components/MessageModal'

export default function GroupDeleteMessage({ isOpen , closeButtonEvent , group_id , group_name }: { isOpen: boolean , closeButtonEvent: () => void , group_id: string , group_name: string }) {
    const { showModal , Modal } = useMessageModal()

    return (
        <OpenChildren isOpen={isOpen}>
            <Message closeButtonEvent={closeButtonEvent}>
                <div className='h-full w-full flex items-center flex-col justify-center text-text'>
                    <p className="m-[30px] text-sm font-bold">グループを削除します</p>
                    <p className="m-[30px] text-sm">グループ名：{group_name}</p>
                    <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                        onClick={async () => {
                            try {
                                const response = await DeleteTrainingGroup(group_id)
                                if (response.ok) {
                                    closeButtonEvent()
                                } else {
                                    showModal("グループの削除に失敗しました", "error", 4000)
                                }
                            } catch (e) {
                                if (e instanceof SessionError) {
                                    showModal("ログインしてください", "error", 4000)
                                } else if (e instanceof CsrfTokenError) {
                                    showModal("グループの削除に失敗しました", "error", 4000)
                                } else {
                                    showModal("グループの削除に失敗しました", "error", 4000)
                                }
                            }
                        }}>削除</Button>
                </div>
            </Message>
            <Modal />
        </OpenChildren>
    )
}