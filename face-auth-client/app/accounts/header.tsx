import TitleIcon from "../../public/User check.svg"
import {Button} from "../_components/buttons"


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

