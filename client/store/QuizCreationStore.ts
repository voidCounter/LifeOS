import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {LocalQuestion, Question} from "@/types/QuizTypes/Question";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import React, {createRef} from "react";

/**
 * Store for quiz creation
 * @type {QuizCreationStore}
 * @return {QuizCreationStore}
 * @property {string} addedQuestion - The questionId of the question that is being added
 * @property {number} questionCount - The count of questions added so far
 * @property {boolean} quizGenerating - The state of the quiz generation
 * @property {function} setQuizGenerating - Function to set the
 * quizGenerating state
 * @property {Question[]} questions - The list of questions added so far
 * @property {function} loadQuestion - Function to load a question
 * @property {function} modifyQuestion - Function to modify a question
 * @property {function} removeQuestion - Function to remove a question
 * @property {function} removeAllQuestions - Function to remove all questions
 */
interface QuizCreationStore {
    addedQuestion: string,
    quizLanguage: string,
    setQuizLanguage: (language: string) => void,
    showSaveQuizModal: boolean,
    questionCount: number
    quizGenerating: boolean,
    setQuizGenerating: (value: boolean) => void,
    questions: Question[],
    loadQuestion: (question: Question, newQuestion?: boolean) => void
    modifyQuestion: (question: Question) => void,
    setShowSaveQuizModal: (value: boolean) => void,
    removeQuestion: (questionId: string) => void
    removeAllQuestions: () => void
}

export const useQuizCreationStore = create<QuizCreationStore>()(
    persist(
        (set) => ({
            addedQuestion: "",
            quizLanguage: "English",
            setQuizLanguage: (language) => set({quizLanguage: language}),
            showSaveQuizModal: false,
            questionCount: 0,
            quizGenerating: false,
            setQuizGenerating: (value) => set({quizGenerating: value}),
            questions: Array<Question>(),
            modifyQuestion: (question) => set((state) => {
                if (question.questionId == state.addedQuestion) {
                    state.addedQuestion = "";
                }
                return {
                    questions: state.questions.map((q) => {
                        if (q.questionId === question.questionId) {
                            return question;
                        }
                        return q;
                    })
                }
            }),
            setShowSaveQuizModal: (value) => set({showSaveQuizModal: value}),
            loadQuestion: (question, newQuestion = false) => set((state) => {
                // setting the questionId as they're used as key during rendering
                question.questionId = state.questionCount.toString();

                // setting the optionId for multiple choice questions'
                // options, as they're used as key during rendering options
                if (question.questionType === "MULTIPLE_CHOICE") {
                    (question as MultipleChoiceQuestion).options = (question as MultipleChoiceQuestion).options.map((option, index) => {
                        option.optionId = index.toString();
                        return option;
                    });
                }
                state.questionCount += 1;

                // tracking the added question to show the edit form for that
                // question
                if (newQuestion) {
                    state.addedQuestion = (question.questionId);
                }
                return {
                    questions: [...state.questions, question]
                }
            }),
            removeAllQuestions: () => set({
                questions: [],
                addedQuestion: "",
                questionCount: 0
            }),
            removeQuestion: (questionId: string) => set((state) => {
                if (questionId == state.addedQuestion) {
                    state.addedQuestion = "";
                }
                return {
                    questions: state.questions.filter((question) => question.questionId !== questionId)
                }
            }),
        }),
        {
            name: "quiz-creation-store"
        }
    )
);