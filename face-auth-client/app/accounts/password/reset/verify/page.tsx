import { LoginLink } from '../../../../_links/accounts';


const Header = () => {
    return (
        <div className="bg-foreground h-[50px] w-full border-b border-line flex items-center">
            <h4 className="ml-[30px] font-bold">パスワード変更</h4>
        </div>
    );
}

const ContentContainer = ({ children }) => {
    return (
        <div className="w-full h-[450px] bg-foreground flex flex-col items-center justify-center font-bold">
            {children}
        </div>
    );
}

const ConfirmMessage = () => {
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center my-2">
            <p className="text-sm">パスワードの変更が完了しました</p>
        </div>
    );
}

const LoginMessage = () => {
    return (
        <div className="w-full h-auto flex items-center justify-center my-2 text-[12px]">
            <p>ログインは</p>
            <LoginLink>
                <p className="text-primary1 hover:text-primary1_hover">こちら</p>
            </LoginLink>
            <p>から</p>
        </div>
    );
}
