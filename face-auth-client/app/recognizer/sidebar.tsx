import AddGroupIcon from "../../public/Add Group.svg";
import GroupIcon from "../../public/Group.svg";
import ImageIcon from "../../public/Image.svg";
import { useState } from "react";
import { Button } from "../components/buttons";

function SidebarContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[200px] h-full bg-foreground border-r-2 border-line flex flex-col z-[99]">
            {children}
        </div>
    );
}

function SidebarHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-foreground h-[50px] w-full flex items-center justify-between">
            {children}
        </div>
    );
}

function SidebarTitle() {
    return (
        <div className="ml-2 text-1xl font-bold">
            学習グループ
        </div>
    );
}

function AddGroup() {
    return (
        <AddGroupIcon className="w-6 h-6 fill-none mr-4 stroke-primary1 hover:stroke-primary1_hover hover:fill-background stroke-2 cursor-pointer" />
    );
}

function SidebarContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex-1 overflow-y-scroll">
            {children}
        </div>
    );
}

function SidebarContentHead() {
    return (
        <div className="h-[25px] w-full flex items-left border-line border-b-2">
            <p className="ml-2 text-1xl text-subtext">Group</p>
        </div>
    );
}

type Group = {
    groupID: string;
    groupName: string;
    groupDataLabels: Array<{ id: string; label: string}>;
}
type Groups = {
    groups: Array<Group>;
};

function SidebarItems({ groups }: Groups) {
    if (!groups || groups.length === 0) {
        return <div className="flex justify-center h-full text-subtext text-sm">グループがありません</div>;
    }

    return (
        <div className="w-full">
            <div className="mt-4"></div>{/*空白調整用*/}
            {groups.map((group) => (
                <TreeItem key={group.groupID} group={group} />
            ))}
        </div>
    );
}

// ツリーアイテムコンポーネント
function TreeItem({ group }: { group: Group }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="ml-4 mb-2">
        <div
        onClick={() => () => {{/*TODO: 画面遷移 */}}}
        className="flex items-center"
        >
            {/* グループの中身を開けるようにする */}
            <span className="text-primary1 mr-2 text-[10px] select-none" onClick={() => setIsOpened(!isOpened)}>
                {isOpened ? "▼" : "▶"}
            </span>
            <div className="cursor-pointer flex overflow-hidden">
                <GroupIcon className="w-5 h-5 fill-none mr-2 stroke-subtext stroke-2"></GroupIcon>
                <p className="overflow-hidden text-ellipsis max-w-[75%] text-1xl">{group.groupName}</p>
            </div>
        </div>

        {/* グループが開かれた場合 */}
        {isOpened && (
        <>
            {/* 学習データがグループに存在する場合表示する */}
            {group.groupDataLabels && group.groupDataLabels.length > 0 ? (
                group.groupDataLabels.map((label) => (
                <div key={label.id} className="flex ml-[20px] cursor-pointer">
                    <ImageIcon className="scale-75 w-6 h-6 fill-none mr-1 stroke-primary1 stroke-2"></ImageIcon>
                    <div key={label.id} className="overflow-hidden text-ellipsis max-w-[60%] text-sm">{label.label}</div>
                </div>
                ))
            ) : (
                <div className="ml-4 text-subtext text-sm mt-1">学習データがありません</div>
            )}
            </>
        )}

    </div>
  );
}


