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

function SidebarHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-foreground h-[50px] w-full flex items-center justify-between">
            {children}
        </div>
    );
}

function SidebarTitle() {
    return (
        <div className="ml-2 text-1xl font-bold">
            学習グループ
        </div>
    );
}

function AddGroup() {
    return (
        <AddGroupIcon className="w-6 h-6 fill-none mr-4 stroke-primary1 hover:stroke-primary1_hover hover:fill-background stroke-2 cursor-pointer" />
    );
}

function SidebarContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex-1 overflow-y-scroll">
            {children}
        </div>
    );
}

function SidebarContentHead() {
    return (
        <div className="h-[25px] w-full flex items-left border-line border-b-2">
            <p className="ml-2 text-1xl text-subtext">Group</p>
        </div>
    );
}

type Group = {
    groupID: string;
    groupName: string;
    groupDataLabels: Array<{ id: string; label: string}>;
}
type Groups = {
    groups: Array<Group>;
};


