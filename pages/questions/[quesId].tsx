import * as React from "react";
import { useAppContext } from "~~/context/state";
import { useAuthContext } from "~~/context/auth";
import AuthFormOnButton from "~~/components/Auth/AuthFormOnButton";
import LoadingSpinner from "~~/components/LoadingSpinner";
import { formatDateAgo, getErrorMsg } from "~~/utils/helperFuncs";

import tw from "twin.macro";
import { Question, useFetchQuestionLazyQuery } from "../~~/lib/__generated__/graphql";
import { ButtonLikeAnchor } from "~~/components/my-mui/Misc";
import Divider from "~~/components/my-mui/Divider";
import { Container } from "~~/components/Layout";
import QuestionPageContent from "~~/components/Question/QuestionPageContent";
import RightSidePanel from "~~/components/Layout/RightSidePanel/dynamic";
import { useRouter } from "next/router";
import getMainLayout from "~~/components/Layout/getMainLayout";
import Link from "next/link";
import SEO from "~~/components/SEO";

const QuestionHeader = tw.div``;

const QuestionPageMain = () => {
  const { notify } = useAppContext();
  const { user } = useAuthContext();
  const { query } = useRouter();
  const quesId = query.quesId ? String(query.quesId) : undefined;
  const [question, setQuestion] = React.useState<Question | null>(null);

  const [fetchQuestion, { data, loading }] = useFetchQuestionLazyQuery({
    onError: (err) => {
      notify(getErrorMsg(err), "error");
    },
  });

  React.useEffect(() => {
    if (quesId) {
      fetchQuestion({ variables: { quesId } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quesId]);

  React.useEffect(() => {
    if (data) {
      setQuestion(data.viewQuestion as Question);
    }
  }, [data]);

  if (loading || !question) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  const { title, views, createdAt, updatedAt } = question;

  return (
    <Container>
      <SEO title={title} description={question.body.slice(100)} />
      <QuestionHeader>
        <div tw="flex sm:(justify-between items-center) flex-nowrap flex-col sm:flex-row ">
          <h1 tw="m-0 mb-1 font-normal text-[22px] md:text-2xl word-wrap[break-word]">
            {title}
          </h1>
          <div tw="p-0 m-0 ml-2 align-baseline  order[-1] self-end sm:(order-none self-auto) ">
            {user ? (
              <Link href="/ask" passHref>
                <ButtonLikeAnchor>Ask Question</ButtonLikeAnchor>
              </Link>
            ) : (
              <AuthFormOnButton buttonType="ask" />
            )}
          </div>
        </div>
        <div tw="text-xs">
          <span>
            Asked <strong>{formatDateAgo(createdAt)} ago</strong>
          </span>
          {createdAt !== updatedAt && (
            <span tw="ml-2">
              Edited <strong>{formatDateAgo(updatedAt)} ago</strong>
            </span>
          )}
          <span tw="ml-2">
            Viewed <strong>{views} times</strong>
          </span>
        </div>
      </QuestionHeader>
      <Divider tw="my-4 border-[hsl(210,8%,90%)]" />
      <QuestionPageContent data={question} />
    </Container>
  );
};

export default function QuestionPage() {
  return (
    <>
      <QuestionPageMain />
      <RightSidePanel />
    </>
  );
}

QuestionPage.getLayout = getMainLayout;
