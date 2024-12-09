function MainBody({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-foreground w-[500px] h-[500px] rounded-[30px] border-2 border-line">
            {children}
        </main>
    );
}
