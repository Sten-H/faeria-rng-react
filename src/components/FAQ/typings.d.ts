// This is to allow json file import
interface QuestionAnswer {
    q: string;
    a: string;
}
declare module '*.json' {
    export const faq: {
        ping: QuestionAnswer[],
        draw: QuestionAnswer[]
    };
}