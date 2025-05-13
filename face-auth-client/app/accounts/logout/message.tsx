import  { LoginPage } from '../../_links/accounts'
import { Message , OpenChildren} from '../../_components/message'
import { Button } from '../../_components/buttons'
import { SetSessionToken } from '@/app/_requests/cookie'

export default function LogoutMessage({ isOpen }: { isOpen: boolean }) {

    const logout = async () => {
        SetSessionToken('');
        LoginPage.Redirect();
    }

    return (
        <OpenChildren isOpen={isOpen}>
            <Message closeButtonEvent={() => LoginPage.Redirect()}>
                <div className='h-full w-full flex items-center flex-col justify-center'>
                    <p className="m-[30px] text-sm font-bold">ログアウトしました</p>
                    <Button 
                        onClick={logout} 
                        className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                    >
                        OK
                    </Button>
                </div>
            </Message>
        </OpenChildren>
    )
}
