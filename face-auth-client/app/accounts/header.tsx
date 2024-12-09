import TitleIcon from "../../public/User check.svg"
import {Button} from "../_components/buttons"
import { LoginLink , RegisterLink } from "../_links/accounts";


const HeaderContainer = ({ children }) => {
    return (
        <div className="fixed bg-foreground h-[60px] w-full z-[100] border-b-2 border-line">
            {children}
        </div>
    );
};


const HeaderContent = ({ children }) => {
    return (
        <div className="bg-foreground h-full w-full flex items-center justify-between">
            {children}
        </div>
    );
};

const Title = () => {
    return (
        <div className="flex items-center ml-4">
            <TitleIcon className="w-8 h-8 fill-none mr-2 stroke-text"></TitleIcon>
            <div className="font-title text-3xl">Face Auth</div>
        </div>
    );
}

const ButtonContainer = ({ children }) => {
    return (
        <div className="w-[200px] flex items-center justify-evenly mr-4">
            {children}
        </div>
    );
}

const LoginButton = () => {
    return (
        <LoginLink>
            <Button className="w-[85px] border-primary2 border-2 text-primary2">ログイン</Button>
        </LoginLink>
    );
}

const RegisterButton = () => {
    return (
        <RegisterLink>
            <Button className="w-[85px] border-primary2 border-2 text-primary2">新規登録</Button>
        </RegisterLink>
    );
}

