'use client'

import LearningIcon from '../../../public/Learning.svg'
import EditIcon from '../../../public/Edit.svg'
import TrashIcon from '../../../public/Trash.svg'
import GroupIcon from '../../../public/Group.svg'
import { Button } from '@/app/_components/buttons'
import { GroupDataPage } from '@/app/_links/recognizer'
import { GetTrainingGroup, UpdateTrainingGroupName } from '@/app/_requests/recongnizer'
import { SessionError, CsrfTokenError } from '@/app/_requests/modules'
import { useEffect, useState, useRef } from 'react'
import { useMessageModal } from '@/app/_components/MessageModal'
import Loading from '@/app/_components/loading'
import GroupRegisterMessage from './register/message'
import GroupDeleteMessage from './delete/message'

export default function Page() {
    return (
        <>
            <HeaderContainer>
                <HeaderTitle />
                <RegisterButton />
            </HeaderContainer>
            <ContentContainer>
                <GroupList />
            </ContentContainer>
        </>
    )
}

function HeaderContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between w-full h-[40px] bg-foreground border-b-2 border-line">
            {children}
        </div>
    )
}

function HeaderTitle() {
    return (
        <div className="flex items-center ml-4">
            <LearningIcon className="w-5 h-[18px] mr-2 fill-none stroke-primary2 stroke-2" />
            <h1 className='font-bold text-[14px]'>学習グループ</h1>
        </div>
    )
}

function RegisterButton() {
    const [ isOpen , setIsOpen ] = useState(false)

    return (
        <>
            <GroupRegisterMessage isOpen={isOpen} closeButtonEvent={() => setIsOpen(false)} />
            <Button onClick={() => setIsOpen(true)} className="w-[80px] h-6 mr-4 text-[11px] bg-primary1 hover:bg-primary1_hover text-foreground border-line">新規作成</Button>
        </>
    )
}

function ContentContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-[calc(100%-40px)] flex flex-col justify-center bg-foreground overflow-y-hidden">
            {children}
        </div>
    )
}

function GroupList() {
    type Group = { id: string, name: string, updated_at: string };
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
            const data: Group[] = await response.json();
            setGroups(data);
            
        } catch (e) {
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

    const dateFormat = (date: string) => {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}/${month}/${day} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
    }

    return (
        <>
            {isLoading ? (
                <Loading disabled={false} />
            ) : (
                <div className="w-full h-full flex flex-col flex-0 overflow-y-auto">
                    {groups.map((group) => (
                        <GroupCard
                            key={group.id}
                            group_id={group.id}
                            group_name={group.name}
                            updated_at={dateFormat(group.updated_at)}
                        />
                    ))}
                </div>
            )}
            <Modal />
        </>
    )
}

function GroupCard({ group_id, group_name, updated_at }: { group_id: string, group_name: string, updated_at: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isShowDeleteMessage, setIsShowDeleteMessage] = useState(false);
    const [newGroupName, setNewGroupName] = useState(group_name);
    const { showModal , Modal } = useMessageModal();
    const inputRef = useRef<HTMLInputElement>(null);

    const confirmEdit = async (group_id: string, group_name: string) => {
        try {
            // グループ名を更新
            const response = await UpdateTrainingGroupName(group_id, group_name);
            if (!response.ok) {
                showModal("グループ名の更新に失敗しました", "error", 4000);
                return;
            }
            showModal("グループ名を更新しました", "success", 4000);
            setIsEditing(false);
            
        } catch (e) {
            if (e instanceof SessionError) {
                showModal("ログインしてください", "error", 4000);
            } else if (e instanceof CsrfTokenError) {
                showModal("セッションが切れました", "error", 4000);
            } else {
                showModal("グループ名の更新に失敗しました", "error", 4000);
            }
        }
    }

    return (
        <div className="w-full h-[40px] min-h-[40px] bg-foreground border-b border-line flex items-center justify-between px-4 flex-0">
            {isEditing ? (
                // 編集中の場合
                <div className="flex items-center w-auto">
                    <GroupIcon className="w-4 h-4 mr-2 fill-none stroke-primary1 stroke-2" />
                    <input type="text" className="font-bold text-[14px] w-[100px]"
                        defaultValue={newGroupName}
                        ref={inputRef}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        onBlur={() => confirmEdit(group_id, newGroupName)}
                        onKeyDown={(e) => e.key === 'Enter' && confirmEdit(group_id, newGroupName)}
                    />
                </div>
            ) : (
                <GroupDataPage.Link linkKey={group_id}>
                    <div className="flex items-center w-auto">
                        <GroupIcon className="w-4 h-4 mr-2 fill-none stroke-primary1 stroke-2" />
                        <h2 className="font-bold text-[14px] w-[100px] overflow-hidden text-ellipsis">{newGroupName}</h2>
                    </div>
                </GroupDataPage.Link>
            )}

            <div className="flex items-center">
                <p className="text-[13px] text-subtext">{updated_at}</p>
            </div>
            <div className="flex items-center h-full">
                <div className='h-full w-[40px] flex items-center justify-center text-subtext'>
                <EditIcon
                        onClick={() => {
                            setIsEditing(true);
                            setTimeout(() => {
                                if (inputRef.current) {
                                    inputRef.current.select(); // テキストボックスを全選択
                                }
                            }, 0);
                        }}
                        className="w-4 h-4 fill-none stroke-subtext stroke-2 hover:fill-line cursor-pointer"
                    />
                </div>
                <div className='h-full w-[40px] flex items-center justify-center text-subtext'>
                    <TrashIcon onClick={() => setIsShowDeleteMessage(true)} className="w-4 h-4 fill-none stroke-subtext stroke-2 hover:fill-line cursor-pointer" />
                    <GroupDeleteMessage isOpen={isShowDeleteMessage} closeButtonEvent={() => setIsShowDeleteMessage(false)} group_id={group_id} group_name={group_name} />
                </div>
            </div>
            <Modal />
        </div>
    )
}
