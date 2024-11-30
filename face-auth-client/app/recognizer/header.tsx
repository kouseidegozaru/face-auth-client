'use client'

import TitleIcon from "../../public/User check.svg"
import UserIcon from "../../public/User.svg"
import {Button} from "../components/buttons"


const HeaderContainer = ({ children }) => {
    return (
        <div className="fixed bg-foreground h-[100px] w-full z-[100]">
            {children}
        </div>
    );
};


// ヘッダー上部
const TopHeader = ({ children }) => {
    return (
        <div className="bg-foreground h-[60px] w-full flex items-center justify-between">
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

const UserNameDisplay = ({ children }: { children: React.ReactNode }) => {// TODO: ユーザー名を取得
    if (!children) {
        children = "User";
    }

    return (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] inline-block">
            {children}
        </div>
    );
}

const UserProfile = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-center h-full w-[200px] mr-4 border-line border-l-2 rounded-none">
            <UserIcon className="w-5 h-5 fill-none mr-2 stroke-subtext stroke-2"></UserIcon>
            <div className="font-default h-full flex items-center text-1xl text-subtext">
                <UserNameDisplay>
                    {children}
                </UserNameDisplay>
            </div>
        </div>
    );
}


// ヘッダー下部
const BottomHeader = ({ children }) => {
    return (
        <div className="bg-header h-[40px] w-full flex items-center justify-end">
            {children}
        </div>
    );
};

const HomeButton = () => {
    const onClick = () => {}// TODO: 画面遷移
    return (
        <Button className="font-light h-[27px] mr-4" onClick={onClick}>Home</Button>
    );
}

// Headerの後ろの空白部分
const HeaderPadding = () => {
    return (
        <div className="h-[100px]" />
    );
}

