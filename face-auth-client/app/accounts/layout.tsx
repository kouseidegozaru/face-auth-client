import Header from "./header"

function MainBody({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-foreground w-[500px] h-[500px] rounded-[30px] border-2 border-line">
            {children}
        </main>
    );
}

export default function AccountsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <div className="flex-1 w-full flex overflow-hidden flex-col items-center justify-center">
                <MainBody>
                    {children}
                </MainBody>
            </div>
        </div>
    );
}
