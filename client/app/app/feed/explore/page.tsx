"use client";
import SearchandCreate from "@/components/SearchandCreate";
import AddNewFeedDialog from "@/app/app/feed/components/AddNewFeedDialog";
import {useState} from "react";
import UserFeed from "@/app/app/feed/components/UserFeed";

export default function Explore() {
    const [openAddNewDialog, setOpenAddNewDialog] = useState(false);
    return (
        <main
            className="flex min-h-screen flex-col">
            <SearchandCreate inputPlaceHolder={"Search"}
                             onCreateHandler={() => setOpenAddNewDialog(true)}/>
            <UserFeed/>
            <AddNewFeedDialog open={openAddNewDialog}
                              onOpenChange={() => setOpenAddNewDialog(!openAddNewDialog)}/>
        </main>
    );
}