import { FC } from 'react'
type Props = {
    question: string,
    answers: string[],
    callback: any,
    userAnswer: any,
    questionNumber: number,
    totalQuestions: number
}

const QuestionCard: FC<Props> = ( props ) => {
    return ( <div>
        <p className='number'>
            Questions: { props.questionNumber } / { props.totalQuestions }
        </p>
        <p dangerouslySetInnerHTML={ { __html: props.question } } />
        <div>
            { props.answers.map( answer => ( <div>
                <button disabled={ props.userAnswer } onClick={ props.callback }>
                    <span dangerouslySetInnerHTML={ { __html: answer } } />
                </button>
            </div> ) ) }
        </div>
    </div> )
}
export default QuestionCard;