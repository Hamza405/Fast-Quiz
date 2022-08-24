import { FC } from 'react'
type Props = {
    question: string,
    answer: string[],
    callback: any,
    userAnswer: string,
    questionNumber: number,
    totalQuestions: number
}

const QuestionCard: FC<Props> = ( props ) => {
    return <div>Question Card</div>
}
export default QuestionCard;