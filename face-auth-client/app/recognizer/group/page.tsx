'use client'

import LearningIcon from '../../../public/Learning.svg'
import EditIcon from '../../../public/Edit.svg'
import TrashIcon from '../../../public/Trash.svg'
import GroupIcon from '../../../public/Group.svg'
import { Button } from '@/app/_components/buttons'

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
    return (
        <div className="w-full h-full flex flex-col flex-0 overflow-y-auto">
            <GroupCard group_id="group_id" group_name="group_name" updated_at="2024-01-01" />
            <GroupCard group_id="group_id" group_name="group_name" updated_at="2024-01-01" />
        </div>
    )
}

function GroupCard({ group_id , group_name , updated_at }: { group_id: string, group_name: string, updated_at: string }) {
    return (
        <div className="w-full h-[40px] min-h-[40px] bg-foreground border-b border-line flex items-center justify-between px-4 flex-0">
            <div className="flex items-center">
                <GroupIcon className="w-4 h-4 mr-2 fill-none stroke-primary1 stroke-2" />
                <h2 className="font-bold text-[14px]">{group_name}</h2>
            </div>
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
