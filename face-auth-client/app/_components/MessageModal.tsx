import React, { useState } from "react";
import CloseIcon from "../../public/Close.svg";

type MessageType = "error" | "warning" | "info" | "success";

type MessageModalProps = {
  message: string;
  type: MessageType;
  onClose: () => void;
};

// モーダルコンポーネント
const MessageModal: React.FC<MessageModalProps> = ({ message, type, onClose }) => {
  const typeStyles = {
    error: "bg-red-100 text-red-800 border-red-500",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-500",
    info: "bg-blue-100 text-blue-800 border-blue-500",
    success: "bg-green-100 text-green-800 border-green-500",
  };

  return (
    <div
      className={`fixed bottom-4 transform flex items-center justify-between
      p-4 border rounded shadow-md z-1002 w-[80vw] m-4 text-center ${typeStyles[type]}`}
    >
      <p className="font-semibold">{message}</p>
      <CloseIcon
                className="w-4 h-4 fill-none mr-4 stroke-subtext stroke-2 cursor-pointer hover:stroke-line select-none"
                onClick={onClose}
        />
    </div>
  );
};

// カスタムフック
// usage: 
// function Home() {
//     const { showModal, Modal } = useMessageModal();
//     return (
//         <div>
//             <button onClick={() => showModal("This is an error message!", "error", 4000)}>Show Error</button>
//             <Modal />
//         </div>
//     );
// }
export const useMessageModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<MessageType>("info");
  const [duration, setDuration] = useState(3000);

  const showModal = (text: string, messageType: MessageType, time: number = 4000) => {
    setMessage(text);
    setType(messageType);
    setDuration(time);
    setIsVisible(true);

    // 一定時間後に自動的に閉じる
    if (time > 0) {
      setTimeout(() => {
        setIsVisible(false);
      }, time);
    }
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  // フック内でモーダルコンポーネントを返す
  const Modal = () => {
    if (!isVisible) return null;
    return <MessageModal message={message} type={type} onClose={closeModal} />;
  };

  return {
    showModal, // モーダルを表示するための関数
    Modal,     // 呼び出し元でレンダリングするモーダルコンポーネント(ページに配置する)
  };
};
