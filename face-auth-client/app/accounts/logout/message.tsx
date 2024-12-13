import  { LoginLink } from '../../_links/accounts'
import { Message , OpenChildren} from '../../_components/message'
import { Button } from '../../_components/buttons'

export default function LogoutMessage({ isOpen }: { isOpen: boolean }) {

  
    return (
        <OpenChildren isOpen={isOpen}>
            <Message closeButtonEvent={}>
                <div className='h-full w-full flex items-center flex-col justify-center'>
                    <p className="m-[30px] text-sm font-bold">ログアウトしました</p>
                    <LoginLink>
                        <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground">OK</Button>
                    </LoginLink>
                </div>
            </Message>
        </OpenChildren>
    )
}
