import { PasswordResetLink } from '../../../_links/accounts';

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

const SendMessage = () => {
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center my-2">
            <p className="text-sm">変更メールを送信しました</p>
            <p className="text-sm">メールのURLを開きアカウントを認証してください</p>
        </div>
    );
}

const ResendMessage = () => {
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center my-2">
            <p className="text-[12px]">メールが届かない場合は</p>
            <div className="text-[12px] flex">
                <PasswordResetLink>
                    <p className="text-primary1 hover:text-primary1_hover">こちら</p>
                </PasswordResetLink>
                から再送信してください
            </div>
        </div>
    );
}
