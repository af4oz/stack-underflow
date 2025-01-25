import { useState, useEffect } from "react";
import RecentQuestions from "~~/components/Question/RecentQuestions";
import LoadingSpinner from "~~/components/LoadingSpinner";
import { useAppContext } from "~~/context/state";
import { formatDateAgo, getErrorMsg } from "~~/utils/helperFuncs";

import tw, { styled } from "twin.macro";
import Divider from "~~/components/my-mui/Divider";
import { useFetchUserLazyQuery, User } from "~~/generated/graphql";
import { useRouter } from "next/router";
import Link from "next/link";
import getMainLayout from "~~/components/Layout/getMainLayout";
import Image from "next/image";
import SEO from "~~/components/SEO";

const UserInfo = styled.div`
  ${tw`flex gap-10 color[inherit] items-center`}
`;
const UserActivity = styled.div`
  ${tw`mt-4`}
`;

const UserAvatar = styled.div`
  ${tw`relative bg-blue-200 bg-opacity-50 h-56 w-48 flex flex-col justify-center items-center rounded-md mx-auto`}
`;
const UserCard = styled.div`
  ${tw`w-full my-4 ml-2 mx-1 sm:ml-2 text-sm md:text-base`}
`;
const UserPageMain = () => {
  const { notify } = useAppContext();
  const { query } = useRouter();
  const { userName } = query || {};
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);

  const [fetchUser, { data, loading }] = useFetchUserLazyQuery({
    onError: (err) => {
      notify(getErrorMsg(err), "error");
    },
  });

  useEffect(() => {
    if (userName) {
      fetchUser({ variables: { username: userName as string } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  useEffect(() => {
    if (data) {
      setFetchedUser(data.getUser as User);
    }
  }, [data]);

  if (loading || !fetchedUser) {
    return <LoadingSpinner />;
  }

  const {
    _id,
    username: fetchedUserName,
    createdAt,
    rep,
    totalQuestions,
    totalAnswers,
    recentQuestions,
    recentAnswers,
  } = fetchedUser;

  return (
    <UserCard>
      <SEO title={`User ${userName} - Stack Underflow`} />
      <UserAvatar>
        <Image
          src={`https://secure.gravatar.com/avatar/${_id}?s=164&d=identicon`}
          alt={fetchedUserName}
          layout="fill"
          tw="rounded-md"
        />
      </UserAvatar>
      <p tw=" text-xl my-2 text-center">
        {rep} <span tw="text-sm">REPUTATION</span>
      </p>
      <div tw=" flex-1 p-2 md:p-4">
        <UserInfo>
          <div>
            <h1 tw="text-2xl text-blue-800 ">{userName}</h1>
            <span tw="color[inherit]">
              member for {formatDateAgo(createdAt)}
            </span>
          </div>
          <div tw="flex text-center">
            <div style={{ marginRight: 10 }}>
              <h2 tw="my-0">{totalAnswers}</h2>
              <span>answers</span>
            </div>
            <div>
              <h2 tw="my-0">{totalQuestions}</h2>
              <span>questions</span>
            </div>
          </div>
        </UserInfo>
        <UserActivity>
          <div tw="mb-5">
            <h3 tw=" font-bold">Last Asked Questions</h3>
            <Divider />
            {recentQuestions.length !== 0 ? (
              recentQuestions.map((q) => (
                <div key={q?._id}>
                  <RecentQuestions creedo={q!} />
                  <Divider tw="border-[hsl(210,8%,90%)]" />
                </div>
              ))
            ) : (
              <p tw="my-2 text-center">No questions asked yet.</p>
            )}
          </div>
          <div>
            <h3 tw="font-bold">Last Answered Questions</h3>
            <Divider />
            {recentAnswers.length !== 0 ? (
              recentAnswers.map((q) => (
                <div key={q?._id}>
                  <RecentQuestions creedo={q!} />
                  <Divider tw="border-[hsl(210,8%,90%)]" />
                </div>
              ))
            ) : (
              <p tw="my-2 text-center">No questions answered yet.</p>
            )}
          </div>
        </UserActivity>
      </div>
    </UserCard>
  );
};

export default function UserPage() {
  return (
    <>
      <UserPageMain />
    </>
  );
}
UserPage.getLayout = getMainLayout;
