import { FC } from 'react';
import Card from './Card';
import Answer from './Answer';
import { AnswerObject } from "../services/utils";

type Props = {
    question: string,
    answers: string[],
    callback: ( e: React.MouseEvent<HTMLButtonElement> ) => void,
    userAnswer: AnswerObject | undefined,
    questionNumber: number,
    totalQuestions: number;
};

const QuestionCard: FC<Props> = ( props ) => {
    return ( <Card>
        <div >
            <p className='text-center'>
                Questions: { props.questionNumber } / { props.totalQuestions }
            </p>
            <p className='text-center my-4' dangerouslySetInnerHTML={ { __html: props.question } } />
            {/* <div>
                { props.answers.map( answer => ( <div key={ answer }>
                    <button disabled={ !!props.userAnswer } value={ answer } onClick={ props.callback }>
                        <span dangerouslySetInnerHTML={ { __html: answer } } />
                    </button>
                </div> ) ) }
            </div> */}
            <div>
                { props.answers.map( answer => <Answer answer={ answer } userAnswer={ !!props.userAnswer } onClick={ props.callback } /> ) }
            </div>
        </div>
    </Card> );
};
export default QuestionCard;