'use client'

import LearningIcon from '../../../public/Learning.svg'
import EditIcon from '../../../public/Edit.svg'
import TrashIcon from '../../../public/Trash.svg'
import GroupIcon from '../../../public/Group.svg'
import { Button } from '@/app/_components/buttons'
import { GroupDataPage } from '@/app/_links/recognizer'
import { GetTrainingGroup } from '@/app/_requests/recongnizer'
import { useEffect, useState } from 'react'
import { GetSessionToken } from '@/app/_requests/cookie'
import { useMessageModal } from '@/app/_components/MessageModal'

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
        <div className="flex items-center justify-between w-full h-[40px] bg-foreground border-b border-line">
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
    return (
        <Button className="w-[80px] h-6 mr-4 text-[11px] bg-primary1 hover:bg-primary1_hover text-foreground border-line">新規作成</Button>
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

    const loadData = async () => {
        // セッショントークンを取得
        const sessionToken = await GetSessionToken();
        if (sessionToken == null) {
            showModal("ログインしてください", "error", 4000);
            return;
        }
        // グループ一覧を取得
        const response = await GetTrainingGroup(sessionToken);
        if (!response.ok) {
            showModal("グループの取得に失敗しました", "error", 4000);
            return;
        }

        // グループ一覧をセット
        const data: Group[] = await response.json();
        setGroups(data);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div className="w-full h-full flex flex-col flex-0 overflow-y-auto">
                {groups.map((group) => (<GroupCard key={group.id} group_id={group.id} group_name={group.name} updated_at={group.updated_at} />))}
            </div>
            <Modal />
        </>
    )
}

function GroupCard({ group_id, group_name, updated_at }: { group_id: string, group_name: string, updated_at: string }) {
    return (
        <div className="w-full h-[40px] min-h-[40px] bg-foreground border-b border-line flex items-center justify-between px-4 flex-0">
            <GroupDataPage.Link linkKey={group_id}>
                <div className="flex items-center">
                    <GroupIcon className="w-4 h-4 mr-2 fill-none stroke-primary1 stroke-2" />
                    <h2 className="font-bold text-[14px]">{group_name}</h2>
                </div>
            </GroupDataPage.Link>
            <div className="flex items-center">
                <p className="text-[13px] text-subtext">{updated_at}</p>
            </div>
            <div className="flex items-center h-full">
                <div className='h-full w-[40px] flex items-center justify-center text-subtext'>
                    <EditIcon className="w-4 h-4 fill-none stroke-subtext stroke-2 hover:fill-line cursor-pointer" />
                </div>
                <div className='h-full w-[40px] flex items-center justify-center text-subtext'>
                    <TrashIcon className="w-4 h-4 fill-none stroke-subtext stroke-2 hover:fill-line cursor-pointer" />
                </div>
            </div>
        </div>
    )
}
