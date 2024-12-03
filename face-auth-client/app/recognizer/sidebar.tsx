import AddGroupIcon from "../../public/Add Group.svg";
import GroupIcon from "../../public/Group.svg";
import ImageIcon from "../../public/Image.svg";
import { useState } from "react";
import { Button } from "../components/buttons";

function SidebarContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[200px] h-full bg-foreground border-r-2 border-line flex flex-col z-[99]">
            {children}
        </div>
    );
}


