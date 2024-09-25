"use client";

import { generateSubStage } from '@/api-handlers/pathway';
import ChatComponent from '@/components/chatcomponent/ChatComponet';
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useChatWindowStore } from '@/store/ChatWindowStore';
import { usePathwayAnswerStore } from '@/store/PathwayAnswerStore';
import { usePathwayPromptStore } from '@/store/PathwayPromptStore';
import { usePathwayQuestionStore } from '@/store/PathwayQuestionStore';
import { useStageStore } from '@/store/StageStore';
import { GeneratedQuestion, GeneratedQuestionType } from '@/types/PathwayTypes';
import { StageType } from '@/types/PathwayTypes/Pathway';
import { ChevronLeft, ChevronRight, LoaderCircle, SparklesIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {ChatMessage} from "@/components/chatcomponent/types";
import {Textarea} from "@/components/ui/textarea";


const PathwayChatComp = () => {

  const questions = usePathwayQuestionStore(state => state.questions);
  const [generatingPathways, setGeneratingPathways] = useState<boolean>(false);


  const [messages, setMessages] = useState<ChatMessage[]>([
      {
          children: <QuestionCompContainer />,
          sender: 'bot',
      }
  ]);


    const answers = usePathwayAnswerStore(state => state.answers);
    const addAnswer = usePathwayAnswerStore(state => state.addAnswer);

    function mapToJsonString(map: Map<string, string>): string {
        const obj: Record<string, string> = Object.fromEntries(map);

        return JSON.stringify(obj);
    }
    const router = useRouter();

    const setPrompt = usePathwayPromptStore(state => state.setPrompt);
    const language = usePathwayPromptStore(state => state.language);

    const setStage = useStageStore(state => state.setStage);

    const defaultAnswers = () => {
        questions.forEach((question, index) => {
            const key = `question - ${index + 1}: ${question}`;
            if (!answers.has(key)) {
                addAnswer(key, ['no answer']);
            }
        });
    };

    const handleGenerateRoadmap = async () => {
        setGeneratingPathways(true);
        defaultAnswers();
        const answersJson = mapToJsonString(answers);
        console.log(answersJson);
        const roadmap = await generateSubStage({
            type: StageType.ROADMAP,
            context: answersJson,
            language,
            parentId: null
        });
        setPrompt(answersJson);

        setGeneratingPathways(false);
        setStage(roadmap[0]);

        router.push(`/app/pathways/explore/${roadmap[0].stageId}`);
    }

  return (
      <ChatComponent
        messages={messages}
        setMessages={setMessages}
        handleSendMessage={async () => {
            await handleGenerateRoadmap();
        }}
        inputPlaceholder={"Enter additional prompt for the pathway"}
        loading={generatingPathways}
      />
  )
}

const QuestionCompContainer = () => {

  const questions = usePathwayQuestionStore(state => state.questions);

  return (
    <div className='flex flex-col w-full gap-y-4 pt-0'>
      <div className='flex flex-col gap-y-4 overflow-y-scroll w-full'>
        {questions.map((question, index) => (
          <QuestionComp key={index} index={index} {...question} />
        )
        )}
      </div>

    </div>
  )
}

const QuestionComp: React.FC<GeneratedQuestion & { index: number }> = ({
                                                                         index,
                                                                         type,
                                                                         question,
                                                                         options
                                                                       }) => {
  const addAnswer = usePathwayAnswerStore(state => state.addAnswer);

  const onChangeAnswer = (ans: string[]) => {
    addAnswer(`question - ${index + 1}: ${question}`, ans);
  };

  const RenderAnswer = () => {
    const [answer, setAnswer] = useState<string[]>([]);

    if (type === GeneratedQuestionType.OPEN_ENDED || type === GeneratedQuestionType.DATE) {
      return (
          <Textarea
              // type={type === GeneratedQuestionType.OPEN_ENDED ? 'text' : 'number'}
              placeholder='Type your answer here'
              className='w-full rounded-xl min-h-4 bg-amber-50'
              onChange={(e) => {
                onChangeAnswer([e.target.value]);
              }}
          />
      );
    } else if (type === GeneratedQuestionType.YES_NO) {
      return (
          <RadioGroup
              defaultValue="yes"
              onValueChange={(value) => {
                onChangeAnswer([value]);
              }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="r1" />
              <Label htmlFor="r1">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r2" />
              <Label htmlFor="r2">No</Label>
            </div>
          </RadioGroup>
      );
    } else if (type === GeneratedQuestionType.MULTIPLE_CHOICE) {

      return (
          <>
            {options?.map((option, index) => (
                <div className='flex items-center space-x-2' key={index}>
                  <Checkbox
                      id={`option-${index}`}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAnswer((prev) => [...prev, option]);
                          onChangeAnswer([...answer, option]);
                        } else {
                          const newAnswer = answer.filter((ans) => ans !== option);
                          setAnswer(newAnswer);
                          onChangeAnswer(newAnswer);
                        }
                      }}
                  />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
            ))}
          </>
      );
    }
  };

  return (
      <div className='w-full flex flex-col gap-y-2 rounded-xl p-4 pt-0'>
        <h1 className='font-semibold text-lg text-foreground'>{question}</h1>
        <RenderAnswer />
      </div>
  );
};

export default PathwayChatComp