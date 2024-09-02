import {QuizTest} from "@/types/QuizTypes/QuizTest";
import {Languages} from "@/types/Language";

export async function fetchLanguages(): Promise<Languages> {
    const response = await fetch('/isoLangs.json');

    if (!response.ok) throw new Error('Failed to fetch languages!')
    return response.json();
}
