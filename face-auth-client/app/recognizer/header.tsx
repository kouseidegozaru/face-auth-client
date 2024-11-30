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

