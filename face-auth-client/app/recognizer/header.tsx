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

