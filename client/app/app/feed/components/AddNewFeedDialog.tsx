import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";
import {feedItemAdditionOption} from "@/config/FeedItemAdditionConfig";
import AddNewFeedItemForm from "@/app/app/feed/components/AddNewFeedItemForm";

interface AddNewFeedDialogProps {
    open: boolean;
    onOpenChange: () => void;
}

export default function AddNewFeedDialog({
                                             open,
                                             onOpenChange
                                         }: AddNewFeedDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new feed</DialogTitle>
                </DialogHeader>
                <Tabs
                    className="w-full flex flex-col items-center"
                >
                    <TabsList
                        className={`w-full  grid sticky top-0 z-50 h-fit rounded-xl`}
                        style={{gridTemplateColumns: `repeat(${feedItemAdditionOption.length}, minmax(0, 1fr))`}}
                    >
                        {
                            feedItemAdditionOption.map((creationOption, index) =>
                                <TabsTrigger key={index}
                                             value={creationOption.tabName.toLowerCase()}
                                             className={"rounded-lg"}
                                >
                                    <div
                                        className={"rounded-lg flex flex-col" +
                                            " gap-2" +
                                            " justify-center items-center"}>
                                        <creationOption.tabIcon
                                            strokeWidth={1}
                                            className={"w-6" +
                                                " h-6"}/>
                                        {creationOption.tabName.charAt(0).toUpperCase() + creationOption.tabName.slice(1)}
                                    </div>
                                </TabsTrigger>
                            )
                        }
                    </TabsList>
                    {
                        feedItemAdditionOption.map((creationOption, index) =>
                            <TabsContent
                                value={creationOption.tabName.toLocaleLowerCase()}
                                key={index}
                                className={"w-full"}>
                                <AddNewFeedItemForm
                                    onAdd={() => onOpenChange()}
                                    itemType={creationOption.tabName}/>
                            </TabsContent>
                        )
                    }
                </Tabs>

            </DialogContent>
        </Dialog>
    );
}