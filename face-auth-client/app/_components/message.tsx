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

const MessageHeader = ({ closeButtonEvent }: { closeButtonEvent: () => void }) => {
    return (
        <div className="w-full h-[40px] flex items-center justify-between border-line border-b-2">
            <MessageIcon className="w-6 h-5 fill-none ml-4 stroke-primary2 stroke-2" />
            <CloseIcon
                className="w-4 h-4 fill-none mr-4 stroke-subtext stroke-2 cursor-pointer hover:stroke-line select-none"
                onClick={closeButtonEvent}
            />
        </div>
    );
};

const MessageBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-1 w-full overflow-y-auto text-center">
            {children}
        </div>
    );
};

export const Message = ({ children , closeButtonEvent }: { children: React.ReactNode , closeButtonEvent: () => void }) => {
    return (
        <BackGround>
            <MessageContainer>
                <MessageHeader closeButtonEvent={closeButtonEvent} />
                <MessageBody>{children}</MessageBody>
            </MessageContainer>
        </BackGround>
    );
}
