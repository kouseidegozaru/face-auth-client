import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'

export default function GroupDeleteMessage({ isOpen , closeButtonEvent , group_id , group_name }: { isOpen: boolean , closeButtonEvent: () => void , group_id: string , group_name: string }) {

    return (
        <OpenChildren isOpen={isOpen}>
            <Message closeButtonEvent={closeButtonEvent}>
                <div className='h-full w-full flex items-center flex-col justify-center text-text'>
                    <p className="m-[30px] text-sm font-bold">グループを削除します</p>
                    <p className="m-[30px] text-sm">グループ名：{group_name}</p>
                    <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground">削除</Button>
                </div>
            </Message>
        </OpenChildren>
    )
}