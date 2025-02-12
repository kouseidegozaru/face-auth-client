import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'

export default function GroupRegisterMessage({ isOpen , closeButtonEvent }: { isOpen: boolean , closeButtonEvent: () => void }) {

    return (
        <OpenChildren isOpen={isOpen}>
            <Message closeButtonEvent={closeButtonEvent}>
                
            </Message>
        </OpenChildren>
    )
}