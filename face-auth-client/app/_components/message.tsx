import MessageIcon from "../../public/Message.svg";
import CloseIcon from "../../public/Close.svg";

const BackGround = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen h-screen bg-msg_background opacity-85 flex items-center justify-center z-1001 inset-0 fixed">
            {children}
        </div>
    );
};

const MessageContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-[600px] h-[400px] bg-foreground rounded-[20px] flex flex-col">
            {children}
        </div>
    );
};
