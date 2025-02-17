'use client'

import LearningIcon from '../../../../../public/Learning.svg'
import EditIcon from '../../../../../public/Edit.svg'
import TrashIcon from '../../../../../public/Trash.svg'
import { Button } from '@/app/_components/buttons'
import { GetTrainingData , UpdateTrainingData } from '@/app/_requests/recongnizer'
import { SessionError, CsrfTokenError } from '@/app/_requests/modules'
import { useState , useEffect, use } from 'react'
import { useMessageModal } from '@/app/_components/MessageModal'
import { getImage } from '@/app/_requests/media'
import Loading from '@/app/_components/loading'
import GroupRegisterMessage from '@/app/recognizer/group/data/register/message'
import DataDeleteMessage from '@/app/recognizer/group/data/delete/message'

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
    const [loading, setLoading] = useState<boolean>(true)

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
        setLoading(true);
        loadTrainingData().then(() => setLoading(false));
    }, [groupID])

    return (
        <>
            <HeaderContainer>
                <HeaderTitle />
                <ButtonContainer>
                    <LearningButton />
                    <PredictButton />
                    <RegisterButton group_id={groupID}/>
                </ButtonContainer>
            </HeaderContainer>
            <ContentContainer>
                {loading  ? (
                    <div className='w-full h-full flex justify-center items-center'>
                        <Loading disabled={!loading}/>
                    </div>
                ) : (
                    <DataList groupDataList={groupDataList}/>
                )}
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

function RegisterButton({ group_id }: { group_id: string }) {
    const [ isOpen , setIsOpen ] = useState(false)
    return (
        <>
            <GroupRegisterMessage isOpen={isOpen} closeButtonEvent={() => setIsOpen(false)} group_id={group_id}/>
            <Button onClick={() => setIsOpen(true)} className="w-[80px] h-6 mr-4 text-[11px] bg-primary1 hover:bg-primary1_hover text-foreground border-line">新規作成</Button>
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
    const [label, setLabel] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')
    const [imageLoading, setImageLoading] = useState<boolean>(true)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newLabel, setNewLabel] = useState<string>('')
    const [newImage, setNewImage] = useState<File | undefined>(undefined)
    const [newImageURL, setNewImageURL] = useState<string>('')
    const { showModal, Modal } = useMessageModal()
    const [ isOpenDeleteMessage , setIsOpenDeleteMessage ] = useState(false)

    useEffect(() => {
        //ラベルのセット
        setLabel(groupData.label)
        
        //画像のローディングを開始
        setImageLoading(true)
        //画像の取得
        getImage(groupData.image).then((url) => {
            //画像のURLをセット
            setImageUrl(url)
            //画像のローディングを終了
            setImageLoading(false)
        })
    }, [groupData])

    const startEditing = () => {
        setIsEditing(true)
        setNewLabel(label)
        setNewImageURL(imageUrl)
        setNewImage(undefined)
    }

    const confirmEditing = () => {

        // ラベルが空の場合は編集をキャンセル
        if (!newLabel) {
            setIsEditing(false)
            return
        }

        try {
            UpdateTrainingData(groupData.id, newLabel, newImage).then((res) => {
                if (!res.ok) {
                    showModal("学習データの更新に失敗しました", "error", 4000);
                    return;
                }
                showModal("学習データを更新しました", "success", 4000);
                setIsEditing(false)
                setLabel(newLabel)
                setImageUrl(newImageURL)
            })
        } catch (error) {
            if (error instanceof SessionError) {
                showModal("ログインしてください", "error", 4000);
            } else if (error instanceof CsrfTokenError) {
                showModal("学習データの更新に失敗しました", "error", 4000);
            } else {
                showModal("エラーが発生しました", "error", 4000);
            }
        }
    }

    const cancelEditing = () => {
        setIsEditing(false)
    }

    function ImageEditBox({ newImageUrl , setNewImageUrl , setNewImage }: { newImageUrl: string , setNewImageUrl: React.Dispatch<React.SetStateAction<string>> , setNewImage: React.Dispatch<React.SetStateAction<File | undefined>> }) {
    
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImageUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
                setNewImage(file);
            }
        };
    
        return (
            <div className='h-full w-full flex justify-center items-center'>
                <div className="relative w-[85%] h-[85%] flex justify-evenly items-center border-2 border-dashed border-line rounded-lg cursor-pointer hover:border-subtext">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="absolute border border-line w-full h-full cursor-pointer opacity-0 inset-0"
                    />
                    <div className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
                        {newImageUrl && (
                            <img 
                                src={newImageUrl} 
                                alt="Preview" 
                                className="w-[60%] h-[60%] object-cover border border-line rounded-lg"
                            />
                        )}
                        <p className="text-[14px] text-subtext my-3">画像を選択</p>
                    </div>
                </div>
            </div>
        );
    }

    const formatUpdatedAt = (date: string) => {
        const d = new Date(date);
        return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    }

    return (
        <div className='w-[400px] h-[200px] min-h-[200px] border border-line m-3 rounded-lg flex overflow-hidden'>
            {!isEditing ? (
                <>
                    <div className='w-[50%] h-full flex flex-col justify-between'>
                        <div>
                            <h1 className='text-lg font-bold text-text ml-3 mt-3 overflow-hidden text-ellipsis'>{label}</h1>
                            <p className='text-sm text-subtext ml-3'>{formatUpdatedAt(groupData.updated_at)}</p>
                        </div>
                        <div className='flex justify-start'>
                            <EditIcon onClick={startEditing} className='w-4 h-4 m-3 fill-none stroke-primary2 stroke-2 hover:stroke-primary2_hover hover:cursor-pointer hover:fill-line'/>
                            <TrashIcon onClick={() => setIsOpenDeleteMessage(true)} className='w-4 h-4 my-3 fill-none stroke-primary2 stroke-2 hover:stroke-primary2_hover hover:cursor-pointer hover:fill-line'/>
                        </div>
                    </div>
                    <div className='w-[50%] h-full'>
                        {imageLoading ? (
                            <Loading disabled={!imageLoading}/>
                        ) : (
                            imageUrl && <img src={imageUrl} className='w-full h-full object-cover' />
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className='w-[50%] h-full flex flex-col justify-between'>
                        <div>
                            <input 
                                type='text' 
                                value={newLabel} 
                                onChange={(e) => setNewLabel(e.target.value)} 
                                className='w-[90%] h-[30px] bg-foreground rounded-[10px] border-2 border-dashed px-2 text-[14px] border-line mt-2 ml-2 mb-[2px] hover:border-subtext'
                            />
                            <p className='text-sm text-subtext ml-3'>{formatUpdatedAt(groupData.updated_at)}</p>
                        </div>
                        <div className='flex justify-start'>
                            <p className='w-[45px] h-[30px] flex justify-center items-center rounded-[5px] text-bold text-[12px] text-foreground bg-apply hover:bg-apply_hover hover:cursor-pointer m-2' onClick={confirmEditing}>変更</p>
                            <p className='w-[45px] h-[30px] flex justify-center items-center rounded-[5px] text-bold text-[10px] text-foreground bg-cancel hover:bg-cancel_hover hover:cursor-pointer my-2' onClick={cancelEditing}>キャンセル</p>
                        </div>
                    </div>
                    <div className='w-[50%] h-full'>
                        <ImageEditBox newImageUrl={newImageURL} setNewImageUrl={setNewImageURL} setNewImage={setNewImage}/>
                    </div>
                </>
            )}
            <DataDeleteMessage isOpen={isOpenDeleteMessage} closeButtonEvent={() => setIsOpenDeleteMessage(false)} group_id={groupData.group} data_id={groupData.id} label={groupData.label}/>
            <Modal />
        </div>
    )
}

