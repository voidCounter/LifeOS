"use client";

import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Message {
    text?: string;
    children?: React.FC;
    sender: 'user' | 'bot';
}

const ChatComponent = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage: Message = {
              text: inputMessage,
              sender: 'user',
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
            
            // Simulate bot response
            setTimeout(() => {
              const botMessage: Message = {
                text: "This is a simulated bot response.",
                sender: 'bot',
              };
              setMessages(prevMessages => [...prevMessages, botMessage]);
            }, 1000);
          }
    };

    return (
        <div className="flex flex-col h-[500px] w-full max-w-md border rounded-lg overflow-hidden">
            <ScrollArea className="flex-grow p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex flex-row gap-1 ${message.sender === 'user' ? 'self-start' : 'self-end'
                            }`}
                    >
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div
                            className={`inline-block p-2 rounded-lg ${message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-black'
                                }`}
                        >
                            {message.text ? message.text : message.children ? <message.children /> : ''}
                        </div>
                    </div>
                ))}
            </ScrollArea>
            <div className="flex items-center p-4 border-t">
                <Input
                    type="text"
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow mr-2"
                />
                <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default ChatComponent;