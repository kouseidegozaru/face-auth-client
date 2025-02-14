'use client'

import LearningIcon from '../../../../../public/Learning.svg'
import EditIcon from '../../../../../public/Edit.svg'
import TrashIcon from '../../../../../public/Trash.svg'
import { Button } from '@/app/_components/buttons'
import { GetTrainingData } from '@/app/_requests/recongnizer'
import { SessionError, CsrfTokenError } from '@/app/_requests/modules'
import { useState , useEffect, use } from 'react'
import { useMessageModal } from '@/app/_components/MessageModal'
import { getImage } from '@/app/_requests/media'

type GroupData = {
    id: string,
    label: string,
    group: string,
    image: string,
    updated_at: string
}
type GroupDataList = GroupData[]

export default function Page({ params }: { params: Promise<{ groupID: string }> }) {
    const { groupID } = use(params)
    const { showModal, Modal } = useMessageModal()
    const [groupDataList, setGroupDataList] = useState<GroupDataList>([])

    const loadTrainingData = async () => {
        try {
            const res = await GetTrainingData(groupID);
            if (!res.ok) {
                showModal("学習データの取得に失敗しました", "error", 4000);
                return;
            }
            const data = await res.json();
            setGroupDataList(data);
        } catch (error) {
            if (error instanceof SessionError) {
                showModal("ログインしてください", "error", 4000);
            } else if (error instanceof CsrfTokenError) {
                showModal("学習データの取得に失敗しました", "error", 4000);
            } else {
                showModal("エラーが発生しました", "error", 4000);
            }
        }

    }

    useEffect(() => {
        loadTrainingData();
    }, [groupID])
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
                <DataList groupDataList={groupDataList}/>
            </ContentContainer>
            <Modal />
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

function DataList({ groupDataList }: { groupDataList: GroupDataList }) {

    return (
        <div className="w-full h-full flex flex-wrap flex-0 overflow-y-auto justify-center pt-3">
            {groupDataList.map((groupData) => (
                <DataCard groupData={groupData} key={groupData.id}/>
            ))}
        </div>
    )
}

function DataCard( { groupData }: { groupData: GroupData }) {
    const [imageUrl, setImageUrl] = useState<string>('')
    useEffect(() => {
        getImage(groupData.image).then((url) => {
            setImageUrl(url)
        })
    }, [groupData])

    const formatUpdatedAt = (date: string) => {
        const d = new Date(date);
        return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    }

    return (
        <div className='w-[400px] h-[200px] min-h-[200px] border border-line m-3 rounded-lg flex overflow-hidden'>

            <div className='w-[50%] h-full flex flex-col justify-between'>
                <div>
                    <h1 className='text-lg font-bold text-text ml-3 mt-3 overflow-hidden text-ellipsis'>{groupData.label}</h1>
                    <p className='text-sm text-subtext ml-3'>{formatUpdatedAt(groupData.updated_at)}</p>
                </div>
                <div className='flex justify-start'>
                    <EditIcon className='w-4 h-4 m-3 fill-none stroke-primary2 stroke-2 hover:stroke-primary2_hover hover:cursor-pointer hover:fill-line'/>
                    <TrashIcon className='w-4 h-4 my-3 fill-none stroke-primary2 stroke-2 hover:stroke-primary2_hover hover:cursor-pointer hover:fill-line'/>
                </div>
            </div>
            <div className='w-[50%] h-full'>
                {imageUrl &&
                    <img src={imageUrl} className='w-full h-full object-cover' />
                }
            </div>
        </div>
    )
}

