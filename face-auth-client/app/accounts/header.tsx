'use client'

import TitleIcon from "../../public/User check.svg"
import {Button} from "../_components/buttons"
import { LoginPage , RegisterPage } from "../_links/accounts";


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
        <LoginPage.Link>
            <Button className="w-[85px] border-primary2 border-2 text-primary2">ログイン</Button>
        </LoginPage.Link>
    );
}

const RegisterButton = () => {
    return (
        <RegisterPage.Link>
            <Button className="w-[85px] border-primary2 border-2 text-primary2">新規登録</Button>
        </RegisterPage.Link>
    );
}

// Headerの後ろの空白部分
const HeaderPadding = () => {
    return (
        <div className="h-[60px]" />
    );
}

export default function Header() {
    return (
        <>
            <HeaderContainer>
                <HeaderContent>
                    <Title />
                    <ButtonContainer>
                        <LoginButton />
                        <RegisterButton />
                    </ButtonContainer>
                </HeaderContent>
            </HeaderContainer>
            <HeaderPadding />
        </>
    );
}
