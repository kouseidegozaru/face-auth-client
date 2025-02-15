import { Message , OpenChildren} from '@/app/_components/message'
import { Button } from '@/app/_components/buttons'
import { UserInput } from '@/app/_components/input'
import { use, useState, useEffect } from 'react'
import { CreateTrainingData } from '@/app/_requests/recongnizer'
import { SessionError, CsrfTokenError } from '@/app/_requests/modules'
import { useMessageModal } from '@/app/_components/MessageModal'
import { GroupDataPage } from '@/app/_links/recognizer'
import Loading from '@/app/_components/loading'

export default function GroupRegisterMessage({ isOpen , closeButtonEvent , group_id }: { isOpen: boolean , closeButtonEvent: () => void , group_id: string }) {
    const [name, setName] = useState("")
    const [errors, setErrors] : any = useState({})
    const { showModal, Modal } = useMessageModal()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [imageURL, setImageURL] = useState<string | null>(null)

    useEffect(() => {
        if (image) {
            setImageURL(URL.createObjectURL(image))
        } else {
            setImageURL(null)
        }
    }, [image])

    // バリデーション
    const validate = (value) => {
        const newErrors : any = { ...errors }

        if (!value) {
            newErrors.name = "画像ラベルを入力してください"
        } else {
            delete newErrors.name
        }

        setErrors(newErrors)
    }
    
    return (
        <>
            <OpenChildren isOpen={isOpen}>
                <Message closeButtonEvent={closeButtonEvent}>
                    <div className='h-full w-full flex items-center flex-col justify-center'>
                        <p className="m-[30px] text-sm font-bold">新規データを登録します</p>
                        <ImageContainer>
                            <FileInputButton setImage={setImage}/>
                            {image ? <ImagePreview imageURL={imageURL} /> : null}
                        </ImageContainer>

                        <UserInput
                            label="ラベル名"
                            inputValue={name}
                            setInputValue={(value) => { setName(value); validate(value) }}
                            errorMessage={errors.name}
                            />
                        {!loading ? (
                            <Button className="w-[90px] h-[45px] m-[30px] bg-primary2 hover:bg-primary2_hover text-foreground"
                                    onClick={async () => {
                                        if (Object.keys(errors).length === 0 && image && name) {
                                            // ローディング開始
                                            setLoading(true)
                                            try {
                                                const response = await CreateTrainingData(group_id, name, image)
                                                if (response.ok) {
                                                    setName("")
                                                    GroupDataPage.Redirect({linkKey: group_id})
                                                } else {
                                                    showModal("データの登録に失敗しました", "error", 4000)
                                                }
                                            } catch (e) {
                                                if (e instanceof SessionError) {
                                                    showModal("ログインしてください", "error", 4000)
                                                } else if (e instanceof CsrfTokenError) {
                                                    showModal("データの登録に失敗しました", "error", 4000)
                                                } else {
                                                    showModal("データの登録に失敗しました", "error", 4000)
                                                }
                                            } finally {
                                                // ローディング終了
                                                setLoading(false)
                                            }
                                        }
                                    }}>
                                作成
                            </Button>
                        ) : (
                            <div className='m-[33px]'>
                                <Loading disabled={!loading}/>
                            </div>
                        )}
                    </div>
                </Message>
            </OpenChildren>
            <Modal />
        </>
    )
}

const ImageContainer = ({ children }) => {
    return (
        <div className="w-[350px] h-[140px] flex flex-col mb-2">
            <p className="text-[11px] text-subtext ml-4 mb-1 font-bold flex item-left">画像</p>
            <div className="relative w-full h-[120px] flex justify-evenly items-center border-2 border-dashed border-line rounded-lg cursor-pointer hover:border-subtext">
                {children}
            </div>
        </div>
    )
}

const FileInputButton = ({ setImage }) => {
    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
        }
    }

    return (
        <>
            <input type="file" accept="image/*" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
            <span className="text-subtext">画像を選択</span>
        </>
    )
}

const ImagePreview = ({ imageURL}) => {
    return (
        <div className='w-[100px] h-[100px] flex justify-center items-center border-2 border-dashed border-line rounded'>
            <img src={imageURL} alt="preview" className="w-[90px] h-[90px] object-cover" />
        </div>
    )
}