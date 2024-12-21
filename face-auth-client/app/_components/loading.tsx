const Loading = ( { disabled }: { disabled?: boolean}) => {
    if (disabled) return null
    return(
        <div className="flex justify-center items-center gap-6">
            <div className="h-10 w-10 animate-spin border-[5px] border-primary1 rounded-full  border-t-transparent"></div>
            <p className="text-sm text-subtext font-weight">実行中</p>
        </div>
    )
}

export default Loading