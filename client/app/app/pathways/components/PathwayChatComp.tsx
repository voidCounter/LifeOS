"use client";

import { generatePathwaysFromAnswer } from '@/api-handlers/pathway';
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useChatWindowStore } from '@/store/ChatWindowStore';
import { usePathwayAnswerStore } from '@/store/PathwayAnswerStore';
import { usePathwayPromptStore, usePathwayQuestionStore } from '@/store/PathwayQuestionStore';
import { GeneratedQuestion, GeneratedQuestionType } from '@/types/PathwayTypes';
import { ChevronLeft, ChevronRight, LoaderCircle, SparklesIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { map, z } from 'zod';

const PathwayChatComp = () => {



  const {
    open, 
    toggleOpen
  } = useChatWindowStore();

  const renderIcon = () => {
    if (!open)
      return <ChevronLeft size={36} className='self-end bg-black/10 p-2 rounded-full hover:bg-muted/25' />
    return <ChevronRight size={36} className='self-end bg-black/10 p-2 rounded-full hover:bg-muted/25' />
  }

  return (
    <div className='self-end h-[90%] absolute -right-5 top-12 rounded-xl flex flex-row gap-x-0 items-center'>
      <Button
        variant={"link"}
        className={`bg-transparent m-0 p-0  rounded-full justify-center items-center pl-10 z-10 ${!open ? "mr-5" : "mr-0"}`}
        onClick={() => {
          toggleOpen(!open);
        }}
      >
        {renderIcon()}
      </Button>
      {
        open ?
            <div className='h-full bg-muted w-[480px] rounded-xl -ml-4 overflow-y-scroll'>
              <div className='p-4 w-full h-full flex flex-col justify-end '>
                <QuestionCompContainer />
              </div>
            </div>
          : null
      }
    </div>
  )
}

const QuestionCompContainer = () => {

  const questions = usePathwayQuestionStore(state => state.questions);

  const [generatingPathways, setGeneratingPathways] = useState<boolean>(false);

  const answers = usePathwayAnswerStore(state => state.answers);
  const addAnswer = usePathwayAnswerStore(state => state.addAnswer);

  function mapToJsonString(map: Map<string, string>): string {
    const obj: Record<string, string> = Object.fromEntries(map);

    return JSON.stringify(obj);
}
  const router = useRouter();
  const setPrompt = usePathwayPromptStore(state => state.setPrompt);
  const language = usePathwayPromptStore(state => state.language);

  const defaultAnswers = () => {
    questions.forEach((question, index) => {
      const key = `question - ${index}`;
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
    const roadmaptId = await generatePathwaysFromAnswer({
      prompt: answersJson,
      language
    });
    setPrompt(answersJson);    
    setGeneratingPathways(false);
    if (roadmaptId) {
      router.push(`/app/pathways/explore/${roadmaptId}`);
    }
    
  }


  useEffect(() => {
    console.log(questions);
    console.log(answers);
    
    
  }, [])

  return (
    <div className='flex flex-col w-full gap-y-4 p-2'>
      {questions.map((question, index) => (
        <QuestionComp key={index} index={index} {...question} />
      )
      )}

      <Button
        type="submit"
        className="w-full mt-4"
        onClick={handleGenerateRoadmap}
        disabled={generatingPathways}
      >
        {
          generatingPathways ?
          <div className={"flex justify-center items-center"}>
              <LoaderCircle className={"animate-spin mr-2"}
                            strokeWidth={1}/>
              Generating PathWay
          </div> : 
          <div
          className={"flex"}
        >
          <SparklesIcon
            className={"w-5 h-5 mr-2"}
            strokeWidth={1}
          />
          Generate Roadmap
        </div>}
      </Button>
    </div>
  )
}

const QuestionComp = ({
  index,
  type,
  question,
  options
}: GeneratedQuestion & {
  index: number
}) => {

  const addAnswer = usePathwayAnswerStore(state => state.addAnswer);
  const onChangeAnswer = (ans: string[]) => {
    addAnswer(`question - ${index}`, ans);
  }
  const renderAnswer = () => {
    if (type === GeneratedQuestionType.OPEN_ENDED || type === GeneratedQuestionType.DATE) {
      return (
        <Input
          type={GeneratedQuestionType.OPEN_ENDED ? 'text' : 'number'}
          placeholder='Type your answer here'
          className='w-full rounded-full'
          onChange={(e) => {
            onChangeAnswer([e.target.value]);
          }}
        />
      )
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
      )
    } else if (type === 'MULTIPLE_CHOICE') {
      const [answer, setAnswer] = useState<string[]>(new Array<string>());

      return (
        options?.map((option, index) => (
          <div className='flex items-center space-x-2' key={index}>
            <Checkbox
              id={`option-${index}`}
              onCheckedChange={(checked) => {
                if (checked) {
                  setAnswer([...answer, option]);
                  onChangeAnswer([...answer, option]);
                } else {
                  setAnswer(answer.filter((ans) => ans !== option));
                  onChangeAnswer(answer.filter((ans) => ans !== option));
                }
              }}
            />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))
      )
    }
  }

  return (
    <div className='w-full flex flex-col gap-y-2'>
      <h1 className='font-semibold text-lg text-foreground'>{question}</h1>
      {renderAnswer()}
    </div>
  )
}

export default PathwayChatComp