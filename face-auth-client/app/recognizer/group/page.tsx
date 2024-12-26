'use client'

import LearningIcon from '../../../public/Learning.svg'
import EditIcon from '../../../public/Edit.svg'
import TrashIcon from '../../../public/Trash.svg'
import GroupIcon from '../../../public/Group.svg'
import { Button } from '@/app/_components/buttons'


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

