'use client';

import Header from "./header";
import Sidebar from "./sidebar";


function MainBody({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 bg-background h-full flex flex-col items-center justify-center">
            <main className="bg-foreground w-[95%] h-[95%] rounded-md border border-line overflow-hidden">
                {children}
            </main>
            
        </div>
    );
}

export default function RecognizerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-1 w-full flex overflow-hidden">
                <Sidebar />
                <MainBody>{children}</MainBody>
            </div>
        </div>

    );
}
