import { ProblemsTicket } from '@/components/problemsTicket';
import { ProblemsReviews } from '@/components/problemsReviews';

const Problem = () => {
    return (
        <div className="_container-default">
            <ProblemsTicket />
            <ProblemsReviews />
        </div>
    );
};

export default Problem;
