'use client';

import Header from "./header";
import Sidebar from "./sidebar";


function MainBody({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 bg-background h-full flex flex-col items-center justify-center">
            <main className="bg-foreground w-[95%] h-[95%] rounded-md shadow-md">
                {children}
            </main>
            
        </div>
    );
}

