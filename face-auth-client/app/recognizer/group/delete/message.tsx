import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'

export default function GroupDeleteMessage({ isOpen , closeButtonEvent , group_id , group_name }: { isOpen: boolean , closeButtonEvent: () => void , group_id: string , group_name: string }) {

    return (
        <OpenChildren isOpen={isOpen}>
            <Message closeButtonEvent={closeButtonEvent}>
                
            </Message>
        </OpenChildren>
    )
}