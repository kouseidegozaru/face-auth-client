'use client'

import LearningIcon from '../../../../../public/Learning.svg'
import EditIcon from '../../../../../public/Edit.svg'
import TrashIcon from '../../../../../public/Trash.svg'
import { Button } from '@/app/_components/buttons'

export default function Page({ params }: { params: Promise<{ groupID: string }> }) {
    return (
        <>
            <HeaderContainer>
                <HeaderTitle />
                <ButtonContainer>
                    <LearningButton />
                    <PredictButton />
                    <RegisterButton />
                </ButtonContainer>
            </HeaderContainer>
            <ContentContainer>
                <DataList />
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

function ButtonContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between w-[300px] h-full">
            {children}
        </div>
    )
}

function RegisterButton() {

    return (
        <>
            <Button className="w-[80px] h-6 mr-4 text-[11px] bg-primary1 hover:bg-primary1_hover text-foreground border-line">新規作成</Button>
        </>
    )
}

function LearningButton() {

    return (
        <>
            <Button className="w-[80px] h-6 mr-4 text-[11px] bg-primary2 hover:bg-primary2_hover text-foreground border-line">学習</Button>
        </>
    )
}
function PredictButton() {

    return (
        <>
            <Button className="w-[80px] h-6 mr-4 text-[11px] bg-primary2 hover:bg-primary2_hover text-foreground border-line">予測</Button>
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

function DataList(){

    return (
        <div className="w-full h-full flex flex-wrap flex-0 overflow-y-auto justify-center my-3">
            {[1,2,3,4,5,6,7,8,9,10].map((_, i) => <DataCard key={i} />)}
        </div>
    )
}

function DataCard() {
    return (
        <div className='w-[400px] h-[200px] min-h-[200px] border border-line m-3 rounded-lg'>
            
        </div>
    )
}

