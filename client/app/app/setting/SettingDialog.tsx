import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import React from "react";
import ModelSetting from "@/app/app/setting/ModelSetting";

interface SettingDialogProps {
    open: boolean;
    onOpenChange?: () => void;
}

export default function SettingDialog({
                                          open,
                                          onOpenChange
                                      }: SettingDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogContent
                className="w-full max-w-[1000px] h-3/4 max-h-[400px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Make changes to your application settings here.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="model"
                      className="w-full h-full">
                    <TabsList className="w-fit h-fit">
                        <TabsTrigger value="model"
                                     className={""}>Model</TabsTrigger>
                        <TabsTrigger
                            value="Appearance"
                            className={""}>Appearance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="model" className={"p-16 w-full" +
                        " h-full"}>
                        <ModelSetting/>
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}