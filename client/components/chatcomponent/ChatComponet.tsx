import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    LoaderCircle,
    Send,
    SparklesIcon,
    User2,
    WandSparklesIcon,
    WormIcon
} from "lucide-react"
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ChatMessage} from "@/components/chatcomponent/types";
import {useChatWindowStore} from "@/store/ChatWindowStore";


const ChatComponent = ({
                            messages,
                            setMessages,
                            inputPlaceholder = "Type a message...",
                            handleSendMessage,
                            loading = false
} : {
    messages: ChatMessage[];
    setMessages: (message : ChatMessage[]) => void
    inputPlaceholder?: string;
    handleSendMessage: () => void;
    loading?: boolean;
}) => {
    const [inputMessage, setInputMessage] = useState('');
    const {
        open,
        toggleOpen
    } = useChatWindowStore();

    const sendMessage = () => {
        if (!inputMessage) return;

        setMessages([
            ...messages,
            {
                children: <p className={"text-base text-black font-normal"}>{inputMessage}</p>,
                sender: 'user',
            },
        ]);

        setInputMessage('');
        handleSendMessage();
    };

    return (
        <div className='self-end h-[85%] absolute -right-5 top-12 rounded-xl flex flex-row gap-x-0 items-center'>
            <Button
                variant={"link"}
                className={`bg-transparent m-0 p-0  rounded-full justify-center items-center pl-10 z-10 ${!open ? "mr-4" : "mr-0"}`}
                onClick={() => {
                    toggleOpen(!open);
                }}
            >
                {renderIcon()}
            </Button>
            {
                open ?
                    <div className={"h-full w-[480px]"}>
                        <div
                            className="flex flex-col h-full w-full max-w-md border rounded-lg overflow-hidden bg-gray-200">
                            <ScrollArea className="flex-grow p-4 grid-flow-col">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`mb-4 flex gap-1 w-full items-center  ${message.sender === 'user' ? 'text-left flex-row-reverse' : 'text-left flex-row'
                                        }`}
                                    >
                                        <div className={"self-start"}>
                                            <Avatar>
                                                {message.sender === 'bot' ? <AvatarFallback>
                                                        <WandSparklesIcon className={"animate-out"}/>
                                                    </AvatarFallback> :
                                                    <AvatarFallback>
                                                        <User2/>
                                                    </AvatarFallback>}
                                            </Avatar>
                                        </div>
                                        <div
                                            className={`inline-block bg-gray-100 pb-2 pr-1 rounded-xl min-w-[90%] min-h-16 items-center pl-1 ${message.sender === 'user' ? 'py-2' : 'pl-0 '}`}
                                        >
                                            {message.children}
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                            <div className="flex items-center p-4 border-t">
                                <Input
                                    type="text"
                                    placeholder={inputPlaceholder}
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    disabled={loading}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    className="flex-grow mr-2"
                                />
                                <Button onClick={sendMessage} size="icon">
                                    {
                                        loading ? <LoaderCircle className={"animate-spin h-4 w-4"} />  :
                                        <Send className="h-4 w-4"/>
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};

export default ChatComponent;

const renderIcon = () => {
    if (!open)
        return <ChevronLeft size={36} className='self-end bg-slate-200 p-2 rounded-full hover:bg-muted/25' />
    return <ChevronRight size={36} className='self-end bg-slate-200 p-2 rounded-full hover:bg-muted/25' />
}