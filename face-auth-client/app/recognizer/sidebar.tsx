import AddGroupIcon from "../../public/Add Group.svg";
import GroupIcon from "../../public/Group.svg";
import ImageIcon from "../../public/Image.svg";
import { useState,useEffect } from "react";
import { Button } from "../_components/buttons";
import { GetTrainingGroup, GetTrainingData } from '@/app/_requests/recongnizer'
import { SessionError } from "../_requests/modules"
import { useMessageModal } from '@/app/_components/MessageModal'
import Loading from '@/app/_components/loading'
import LogoutMessage from '@/app/accounts/logout/message'
import { GroupDataPage } from "../_links/recognizer";


type Group = { id: string, name: string, updated_at: string };
type Groups = Group[];

export default function Sidebar() {
    const { showModal, Modal } = useMessageModal();
    const [groups, setGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        try {
            // グループ一覧を取得
            const response = await GetTrainingGroup();
            if (!response.ok) {
                showModal("グループの取得に失敗しました", "error", 4000);
                return;
            }

            // グループ一覧をセット
            const data: Groups = await response.json();
            setGroups(data);

        } catch (e) {
            // セッショントークンエラー
            if (e instanceof SessionError) {
                showModal("ログインしてください", "error", 4000);
            } else {
                showModal("グループの取得に失敗しました", "error", 4000);
            }
        }
    }

    useEffect(() => {
        setIsLoading(true);
        loadData();
        setIsLoading(false);
    }, [])

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarTitle />
                <AddGroup />
            </SidebarHeader>
            <SidebarContent>
                <SidebarContentHead />
                {isLoading ? (
                    <div className="mt-4">
                        <Loading disabled={false} />
                    </div>
                ):
                    <SidebarItems groups={groups} />
                }
            </SidebarContent>
            <SidebarFooter>
                <SidebarFooterHead />
                <LogoutContent />
            </SidebarFooter>
            <Modal />
        </SidebarContainer>
    );
}

function SidebarContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[200px] h-full bg-foreground border-r border-line flex flex-col z-[100]">
            {children}
        </div>
    );
}

function SidebarHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-[50px] w-full flex items-center justify-between">
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
        <div className="w-full flex-1 overflow-y-auto">
            {children}
        </div>
    );
}

function SidebarContentHead() {
    return (
        <div className="h-[25px] w-full flex items-left border-line border-b">
            <p className="ml-1 text-[13px] font-bold text-subtext">Group</p>
        </div>
    );
}

function SidebarItems({ groups }: { groups: Groups }) {
    if (!groups || groups.length === 0) {
        return <div className="flex justify-center h-full text-subtext text-sm">グループがありません</div>;
    }

    return (
        <div className="w-full">
            <div className="mt-4"></div>{/*空白調整用*/}
            {groups.map((group) => (
                <TreeItem key={group.id} group={group} />
            ))}
        </div>
    );
}

// ツリーアイテムコンポーネント
function TreeItem({ group }: { group: Group }) {
    type GroupData = { id: string, label: string, group: string, image: string, updated_at: string };
    
    const [isOpened, setIsOpened] = useState(false);
    const [groupData, setGroupData] = useState<GroupData[]>([]);

    const loadDataTree = async () => {
        const response = await GetTrainingData(group.id);
        if (!response.ok) {
            setGroupData([]);
            return;
        }
        const data: GroupData[] = await response.json();
        setGroupData(data);
    }

    useEffect(() => {
        if (!isOpened) {
            return;
        }
        loadDataTree();
    }, [isOpened])

    return (
        <div className="ml-4 mb-1">
            <div className="flex items-center hover:bg-line rounded-sm overflow-hidden"
            >
                {/* グループの中身を開けるようにする */}
                <span className="text-primary1 mr-1 text-[10px] select-none" onClick={() => setIsOpened(!isOpened)}>
                    {isOpened ? "▼" : "▶"}
                </span>
                <div className="cursor-pointer flex overflow-hidden items-center">
                    <GroupIcon className="w-4 h-4 fill-none mr-1 stroke-primary1 stroke-2"></GroupIcon>
                    <p 
                    onClick={() => {GroupDataPage.Redirect({ linkKey: group.id });}}
                    className="overflow-hidden text-ellipsis max-w-[75%] text-[14px] font-bold">{group.name}</p>
                </div>
            </div>

            {/* グループが開かれた場合 */}
            {isOpened && (
            <>
                {/* 学習データがグループに存在する場合表示する */}
                {groupData && groupData.length ? (
                    groupData.map((label) => (
                    <div key={label.id} className="flex ml-[20px] cursor-pointer border-line border-l items-center hover:bg-line rounded-sm overflow-hidden">
                        <ImageIcon className="scale-50 w-5 h-5 fill-none mr-1 stroke-subtext stroke-2"></ImageIcon>
                        <div key={label.id} className="overflow-hidden text-ellipsis max-w-[60%] text-sm">{label.label}</div>
                    </div>
                    ))
                ) : (
                    <div className="ml-4 text-subtext text-[12px] font-bold mt-1">学習データがありません</div>
                )}
                </>
            )}

        </div>
    );
}

function SidebarFooter({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-auto w-full">
            {children}
        </div>
    );
}

function SidebarFooterHead() {
    return (
        <div className="h-[25px] w-full flex items-left border-line border-b">
            <p className="ml-1 text-[13px] font-bold text-subtext">User</p>
        </div>
    );
}

function LogoutContent() {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="w-full h-[50px] flex items-center justify-center">
            <LogoutMessage isOpen={isOpen}/>
            <Button className="border-cancel border text-cancel text-[12px] h-[25px] hover:bg-line" onClick={() => setOpen(true)}>Logout</Button>
        </div>
    );
}


