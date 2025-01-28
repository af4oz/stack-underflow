import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  author: Author;
  body: Scalars['String']['output'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  points: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  voted?: Maybe<VoteType>;
};

export type AnswerVotes = {
  __typename?: 'AnswerVotes';
  ansId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
  vote: VoteType;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  author: Author;
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum CommentParentType {
  Answer = 'Answer',
  Question = 'Question'
}

export type GetAllTagsResult = {
  __typename?: 'GetAllTagsResult';
  nextCursor: Scalars['String']['output'];
  tags: Array<Tag>;
};

export type LoggedUser = {
  __typename?: 'LoggedUser';
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptAnswer: Question;
  addComment: Comment;
  deleteAnswer: Scalars['ID']['output'];
  deleteComment: Scalars['ID']['output'];
  deleteQuestion: Scalars['ID']['output'];
  editAnswer: Array<Answer>;
  editComment: Comment;
  editQuestion: Question;
  login: LoggedUser;
  postAnswer: Array<Answer>;
  postQuestion: Question;
  register: LoggedUser;
  voteAnswer: Answer;
  voteQuestion: Question;
};


export type MutationAcceptAnswerArgs = {
  ansId: Scalars['ID']['input'];
  quesId: Scalars['ID']['input'];
};


export type MutationAddCommentArgs = {
  body: Scalars['String']['input'];
  parentId: Scalars['ID']['input'];
  parentType: CommentParentType;
};


export type MutationDeleteAnswerArgs = {
  ansId: Scalars['ID']['input'];
  quesId: Scalars['ID']['input'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationDeleteQuestionArgs = {
  quesId: Scalars['ID']['input'];
};


export type MutationEditAnswerArgs = {
  ansId: Scalars['ID']['input'];
  body: Scalars['String']['input'];
  quesId: Scalars['ID']['input'];
};


export type MutationEditCommentArgs = {
  body: Scalars['String']['input'];
  commentId: Scalars['ID']['input'];
};


export type MutationEditQuestionArgs = {
  body: Scalars['String']['input'];
  quesId: Scalars['ID']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationPostAnswerArgs = {
  body: Scalars['String']['input'];
  quesId: Scalars['ID']['input'];
};


export type MutationPostQuestionArgs = {
  body: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationVoteAnswerArgs = {
  ansId: Scalars['ID']['input'];
  quesId: Scalars['ID']['input'];
  voteType: VoteType;
};


export type MutationVoteQuestionArgs = {
  quesId: Scalars['ID']['input'];
  voteType: VoteType;
};

export type NextPrevPage = {
  __typename?: 'NextPrevPage';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
};

export type PaginatedQuesList = {
  __typename?: 'PaginatedQuesList';
  currentPage: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  questions: Array<Maybe<Question>>;
  search?: Maybe<Scalars['String']['output']>;
  sortBy: QuestionSortBy;
  tag?: Maybe<Scalars['String']['output']>;
  totalCount: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllTags: GetAllTagsResult;
  getAllUsers: Array<User>;
  getQuestions: PaginatedQuesList;
  getUser: User;
  viewQuestion: Question;
  whoami: User;
};


export type QueryGetAllTagsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filterBySearch?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetQuestionsArgs = {
  filterBySearch?: InputMaybe<Scalars['String']['input']>;
  filterByTag?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  sortBy?: InputMaybe<QuestionSortBy>;
};


export type QueryGetUserArgs = {
  username: Scalars['String']['input'];
};


export type QueryViewQuestionArgs = {
  quesId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  acceptedAnswer?: Maybe<Scalars['ID']['output']>;
  answerCount: Scalars['Int']['output'];
  answers: Array<Answer>;
  author: Author;
  body: Scalars['String']['output'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  downvoteCount: Scalars['Int']['output'];
  hotAlgo: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  points: Scalars['Int']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  upvoteCount: Scalars['Int']['output'];
  views: Scalars['Int']['output'];
  voted?: Maybe<VoteType>;
};

export enum QuestionSortBy {
  Hot = 'HOT',
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
  Views = 'VIEWS',
  Votes = 'VOTES'
}

export type QuestionVotes = {
  __typename?: 'QuestionVotes';
  quesId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
  vote: VoteType;
};

export type RecentActivity = {
  __typename?: 'RecentActivity';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  points: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export enum RoleType {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  questionCount: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  answers: Array<Answer>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  recentAnswers: Array<RecentActivity>;
  recentQuestions: Array<RecentActivity>;
  rep: Scalars['Int']['output'];
  role: RoleType;
  totalAnswers: Scalars['Int']['output'];
  totalQuestions: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export enum VoteType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}

export type AuthorDetailsFragment = { __typename?: 'Author', id: string, username: string };

export type AnswerDetailsFragment = { __typename?: 'Answer', id: string, body: string, points: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }> };

export type QuestionDetailsFragment = { __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, acceptedAnswer?: string | null, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }>, answers: Array<{ __typename?: 'Answer', id: string, body: string, points: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }> }> };

export type PostQuestionDetailsFragment = { __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } };

export type LoggedUserDetailsFragment = { __typename?: 'LoggedUser', id: string, username: string, role: string, token: string };

export type CommentDetailsFragment = { __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } };

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'LoggedUser', id: string, username: string, role: string, token: string } };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'LoggedUser', id: string, username: string, role: string, token: string } };

export type AddQuestionMutationVariables = Exact<{
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddQuestionMutation = { __typename?: 'Mutation', postQuestion: { __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } } };

export type UpdateQuestionMutationVariables = Exact<{
  quesId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', editQuestion: { __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, acceptedAnswer?: string | null, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }>, answers: Array<{ __typename?: 'Answer', id: string, body: string, points: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }> }> } };

export type RemoveQuestionMutationVariables = Exact<{
  quesId: Scalars['ID']['input'];
}>;


export type RemoveQuestionMutation = { __typename?: 'Mutation', deleteQuestion: string };

export type SubmitQuesVoteMutationVariables = Exact<{
  quesId: Scalars['ID']['input'];
  voteType: VoteType;
}>;


export type SubmitQuesVoteMutation = { __typename?: 'Mutation', voteQuestion: { __typename?: 'Question', id: string, voted?: VoteType | null, points: number } };

export type AddCommentMutationVariables = Exact<{
  parentId: Scalars['ID']['input'];
  parentType: CommentParentType;
  body: Scalars['String']['input'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } } };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
  body: Scalars['String']['input'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: string };

export type AddAnswerMutationVariables = Exact<{
  quesId: Scalars['ID']['input'];
  body: Scalars['String']['input'];
}>;


export type AddAnswerMutation = { __typename?: 'Mutation', postAnswer: Array<{ __typename?: 'Answer', id: string, body: string, points: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }> }> };

export type UpdateAnswerMutationVariables = Exact<{
  quesId: Scalars['ID']['input'];
  ansId: Scalars['ID']['input'];
  body: Scalars['String']['input'];
}>;


export type UpdateAnswerMutation = { __typename?: 'Mutation', editAnswer: Array<{ __typename?: 'Answer', id: string, body: string, points: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }> }> };

export type RemoveAnswerMutationVariables = Exact<{
  quesId: Scalars['ID']['input'];
  ansId: Scalars['ID']['input'];
}>;


export type RemoveAnswerMutation = { __typename?: 'Mutation', deleteAnswer: string };

export type SubmitAnsVoteMutationVariables = Exact<{
  quesId: Scalars['ID']['input'];
  ansId: Scalars['ID']['input'];
  voteType: VoteType;
}>;


export type SubmitAnsVoteMutation = { __typename?: 'Mutation', voteAnswer: { __typename?: 'Answer', id: string, voted?: VoteType | null, points: number } };

export type SubmitAcceptAnsMutationVariables = Exact<{
  quesId: Scalars['ID']['input'];
  ansId: Scalars['ID']['input'];
}>;


export type SubmitAcceptAnsMutation = { __typename?: 'Mutation', acceptAnswer: { __typename?: 'Question', id: string, acceptedAnswer?: string | null } };

export type FetchQuestionsQueryVariables = Exact<{
  sortBy: QuestionSortBy;
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  filterByTag?: InputMaybe<Scalars['String']['input']>;
  filterBySearch?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchQuestionsQuery = { __typename?: 'Query', getQuestions: { __typename?: 'PaginatedQuesList', totalCount: number, currentPage: number, pageSize: number, search?: string | null, tag?: string | null, sortBy: QuestionSortBy, questions: Array<{ __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, createdAt: any, updatedAt: any, answerCount: number, author: { __typename?: 'Author', id: string, username: string } } | null> } };

export type FetchQuestionQueryVariables = Exact<{
  quesId: Scalars['ID']['input'];
}>;


export type FetchQuestionQuery = { __typename?: 'Query', viewQuestion: { __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, createdAt: any, updatedAt: any, acceptedAnswer?: string | null, voted?: VoteType | null, author: { __typename?: 'Author', id: string, username: string }, answers: Array<{ __typename?: 'Answer', id: string, body: string, points: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }> }>, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: string, username: string } }> } };

export type FetchUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FetchUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, username: string, role: RoleType, createdAt: any, rep: number, totalQuestions: number, totalAnswers: number, recentQuestions: Array<{ __typename?: 'RecentActivity', id: string, title?: string | null, points: number, createdAt: any }>, recentAnswers: Array<{ __typename?: 'RecentActivity', id: string, title?: string | null, points: number, createdAt: any }> } };

export type FetchAllTagsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filterBySearch?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchAllTagsQuery = { __typename?: 'Query', getAllTags: { __typename?: 'GetAllTagsResult', nextCursor: string, tags: Array<{ __typename?: 'Tag', name: string, id: string, questionCount: number }> } };

export type FetchAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }> };

export const AuthorDetailsFragmentDoc = gql`
    fragment AuthorDetails on Author {
  id
  username
}
    `;
export const CommentDetailsFragmentDoc = gql`
    fragment CommentDetails on Comment {
  id
  author {
    ...AuthorDetails
  }
  body
  createdAt
  updatedAt
}
    ${AuthorDetailsFragmentDoc}`;
export const AnswerDetailsFragmentDoc = gql`
    fragment AnswerDetails on Answer {
  id
  author {
    ...AuthorDetails
  }
  body
  comments {
    ...CommentDetails
  }
  points
  voted
  createdAt
  updatedAt
}
    ${AuthorDetailsFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const QuestionDetailsFragmentDoc = gql`
    fragment QuestionDetails on Question {
  id
  author {
    ...AuthorDetails
  }
  title
  body
  tags
  points
  views
  acceptedAnswer
  comments {
    ...CommentDetails
  }
  answers {
    ...AnswerDetails
  }
  voted
  createdAt
  updatedAt
}
    ${AuthorDetailsFragmentDoc}
${CommentDetailsFragmentDoc}
${AnswerDetailsFragmentDoc}`;
export const PostQuestionDetailsFragmentDoc = gql`
    fragment PostQuestionDetails on Question {
  id
  author {
    ...AuthorDetails
  }
  title
  body
  tags
  points
  views
  voted
  createdAt
  updatedAt
}
    ${AuthorDetailsFragmentDoc}`;
export const LoggedUserDetailsFragmentDoc = gql`
    fragment LoggedUserDetails on LoggedUser {
  id
  username
  role
  token
}
    `;
export const RegisterUserDocument = gql`
    mutation registerUser($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    ...LoggedUserDetails
  }
}
    ${LoggedUserDetailsFragmentDoc}`;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...LoggedUserDetails
  }
}
    ${LoggedUserDetailsFragmentDoc}`;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const AddQuestionDocument = gql`
    mutation addQuestion($title: String!, $body: String!, $tags: [String!]!) {
  postQuestion(title: $title, body: $body, tags: $tags) {
    ...PostQuestionDetails
  }
}
    ${PostQuestionDetailsFragmentDoc}`;
export type AddQuestionMutationFn = Apollo.MutationFunction<AddQuestionMutation, AddQuestionMutationVariables>;

/**
 * __useAddQuestionMutation__
 *
 * To run a mutation, you first call `useAddQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQuestionMutation, { data, loading, error }] = useAddQuestionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddQuestionMutation(baseOptions?: Apollo.MutationHookOptions<AddQuestionMutation, AddQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddQuestionMutation, AddQuestionMutationVariables>(AddQuestionDocument, options);
      }
export type AddQuestionMutationHookResult = ReturnType<typeof useAddQuestionMutation>;
export type AddQuestionMutationResult = Apollo.MutationResult<AddQuestionMutation>;
export type AddQuestionMutationOptions = Apollo.BaseMutationOptions<AddQuestionMutation, AddQuestionMutationVariables>;
export const UpdateQuestionDocument = gql`
    mutation updateQuestion($quesId: ID!, $title: String!, $body: String!, $tags: [String!]!) {
  editQuestion(quesId: $quesId, title: $title, body: $body, tags: $tags) {
    ...QuestionDetails
  }
}
    ${QuestionDetailsFragmentDoc}`;
export type UpdateQuestionMutationFn = Apollo.MutationFunction<UpdateQuestionMutation, UpdateQuestionMutationVariables>;

/**
 * __useUpdateQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionMutation, { data, loading, error }] = useUpdateQuestionMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument, options);
      }
export type UpdateQuestionMutationHookResult = ReturnType<typeof useUpdateQuestionMutation>;
export type UpdateQuestionMutationResult = Apollo.MutationResult<UpdateQuestionMutation>;
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const RemoveQuestionDocument = gql`
    mutation removeQuestion($quesId: ID!) {
  deleteQuestion(quesId: $quesId)
}
    `;
export type RemoveQuestionMutationFn = Apollo.MutationFunction<RemoveQuestionMutation, RemoveQuestionMutationVariables>;

/**
 * __useRemoveQuestionMutation__
 *
 * To run a mutation, you first call `useRemoveQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeQuestionMutation, { data, loading, error }] = useRemoveQuestionMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *   },
 * });
 */
export function useRemoveQuestionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveQuestionMutation, RemoveQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveQuestionMutation, RemoveQuestionMutationVariables>(RemoveQuestionDocument, options);
      }
export type RemoveQuestionMutationHookResult = ReturnType<typeof useRemoveQuestionMutation>;
export type RemoveQuestionMutationResult = Apollo.MutationResult<RemoveQuestionMutation>;
export type RemoveQuestionMutationOptions = Apollo.BaseMutationOptions<RemoveQuestionMutation, RemoveQuestionMutationVariables>;
export const SubmitQuesVoteDocument = gql`
    mutation submitQuesVote($quesId: ID!, $voteType: VoteType!) {
  voteQuestion(quesId: $quesId, voteType: $voteType) {
    id
    voted
    points
  }
}
    `;
export type SubmitQuesVoteMutationFn = Apollo.MutationFunction<SubmitQuesVoteMutation, SubmitQuesVoteMutationVariables>;

/**
 * __useSubmitQuesVoteMutation__
 *
 * To run a mutation, you first call `useSubmitQuesVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitQuesVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitQuesVoteMutation, { data, loading, error }] = useSubmitQuesVoteMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      voteType: // value for 'voteType'
 *   },
 * });
 */
export function useSubmitQuesVoteMutation(baseOptions?: Apollo.MutationHookOptions<SubmitQuesVoteMutation, SubmitQuesVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitQuesVoteMutation, SubmitQuesVoteMutationVariables>(SubmitQuesVoteDocument, options);
      }
export type SubmitQuesVoteMutationHookResult = ReturnType<typeof useSubmitQuesVoteMutation>;
export type SubmitQuesVoteMutationResult = Apollo.MutationResult<SubmitQuesVoteMutation>;
export type SubmitQuesVoteMutationOptions = Apollo.BaseMutationOptions<SubmitQuesVoteMutation, SubmitQuesVoteMutationVariables>;
export const AddCommentDocument = gql`
    mutation addComment($parentId: ID!, $parentType: CommentParentType!, $body: String!) {
  addComment(parentId: $parentId, body: $body, parentType: $parentType) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      parentType: // value for 'parentType'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const EditCommentDocument = gql`
    mutation editComment($commentId: ID!, $body: String!) {
  editComment(commentId: $commentId, body: $body) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const AddAnswerDocument = gql`
    mutation addAnswer($quesId: ID!, $body: String!) {
  postAnswer(quesId: $quesId, body: $body) {
    ...AnswerDetails
  }
}
    ${AnswerDetailsFragmentDoc}`;
export type AddAnswerMutationFn = Apollo.MutationFunction<AddAnswerMutation, AddAnswerMutationVariables>;

/**
 * __useAddAnswerMutation__
 *
 * To run a mutation, you first call `useAddAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAnswerMutation, { data, loading, error }] = useAddAnswerMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useAddAnswerMutation(baseOptions?: Apollo.MutationHookOptions<AddAnswerMutation, AddAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAnswerMutation, AddAnswerMutationVariables>(AddAnswerDocument, options);
      }
export type AddAnswerMutationHookResult = ReturnType<typeof useAddAnswerMutation>;
export type AddAnswerMutationResult = Apollo.MutationResult<AddAnswerMutation>;
export type AddAnswerMutationOptions = Apollo.BaseMutationOptions<AddAnswerMutation, AddAnswerMutationVariables>;
export const UpdateAnswerDocument = gql`
    mutation updateAnswer($quesId: ID!, $ansId: ID!, $body: String!) {
  editAnswer(quesId: $quesId, ansId: $ansId, body: $body) {
    ...AnswerDetails
  }
}
    ${AnswerDetailsFragmentDoc}`;
export type UpdateAnswerMutationFn = Apollo.MutationFunction<UpdateAnswerMutation, UpdateAnswerMutationVariables>;

/**
 * __useUpdateAnswerMutation__
 *
 * To run a mutation, you first call `useUpdateAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAnswerMutation, { data, loading, error }] = useUpdateAnswerMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      ansId: // value for 'ansId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateAnswerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAnswerMutation, UpdateAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAnswerMutation, UpdateAnswerMutationVariables>(UpdateAnswerDocument, options);
      }
export type UpdateAnswerMutationHookResult = ReturnType<typeof useUpdateAnswerMutation>;
export type UpdateAnswerMutationResult = Apollo.MutationResult<UpdateAnswerMutation>;
export type UpdateAnswerMutationOptions = Apollo.BaseMutationOptions<UpdateAnswerMutation, UpdateAnswerMutationVariables>;
export const RemoveAnswerDocument = gql`
    mutation removeAnswer($quesId: ID!, $ansId: ID!) {
  deleteAnswer(quesId: $quesId, ansId: $ansId)
}
    `;
export type RemoveAnswerMutationFn = Apollo.MutationFunction<RemoveAnswerMutation, RemoveAnswerMutationVariables>;

/**
 * __useRemoveAnswerMutation__
 *
 * To run a mutation, you first call `useRemoveAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAnswerMutation, { data, loading, error }] = useRemoveAnswerMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      ansId: // value for 'ansId'
 *   },
 * });
 */
export function useRemoveAnswerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAnswerMutation, RemoveAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAnswerMutation, RemoveAnswerMutationVariables>(RemoveAnswerDocument, options);
      }
export type RemoveAnswerMutationHookResult = ReturnType<typeof useRemoveAnswerMutation>;
export type RemoveAnswerMutationResult = Apollo.MutationResult<RemoveAnswerMutation>;
export type RemoveAnswerMutationOptions = Apollo.BaseMutationOptions<RemoveAnswerMutation, RemoveAnswerMutationVariables>;
export const SubmitAnsVoteDocument = gql`
    mutation submitAnsVote($quesId: ID!, $ansId: ID!, $voteType: VoteType!) {
  voteAnswer(quesId: $quesId, ansId: $ansId, voteType: $voteType) {
    id
    voted
    points
  }
}
    `;
export type SubmitAnsVoteMutationFn = Apollo.MutationFunction<SubmitAnsVoteMutation, SubmitAnsVoteMutationVariables>;

/**
 * __useSubmitAnsVoteMutation__
 *
 * To run a mutation, you first call `useSubmitAnsVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAnsVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAnsVoteMutation, { data, loading, error }] = useSubmitAnsVoteMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      ansId: // value for 'ansId'
 *      voteType: // value for 'voteType'
 *   },
 * });
 */
export function useSubmitAnsVoteMutation(baseOptions?: Apollo.MutationHookOptions<SubmitAnsVoteMutation, SubmitAnsVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitAnsVoteMutation, SubmitAnsVoteMutationVariables>(SubmitAnsVoteDocument, options);
      }
export type SubmitAnsVoteMutationHookResult = ReturnType<typeof useSubmitAnsVoteMutation>;
export type SubmitAnsVoteMutationResult = Apollo.MutationResult<SubmitAnsVoteMutation>;
export type SubmitAnsVoteMutationOptions = Apollo.BaseMutationOptions<SubmitAnsVoteMutation, SubmitAnsVoteMutationVariables>;
export const SubmitAcceptAnsDocument = gql`
    mutation submitAcceptAns($quesId: ID!, $ansId: ID!) {
  acceptAnswer(quesId: $quesId, ansId: $ansId) {
    id
    acceptedAnswer
  }
}
    `;
export type SubmitAcceptAnsMutationFn = Apollo.MutationFunction<SubmitAcceptAnsMutation, SubmitAcceptAnsMutationVariables>;

/**
 * __useSubmitAcceptAnsMutation__
 *
 * To run a mutation, you first call `useSubmitAcceptAnsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAcceptAnsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAcceptAnsMutation, { data, loading, error }] = useSubmitAcceptAnsMutation({
 *   variables: {
 *      quesId: // value for 'quesId'
 *      ansId: // value for 'ansId'
 *   },
 * });
 */
export function useSubmitAcceptAnsMutation(baseOptions?: Apollo.MutationHookOptions<SubmitAcceptAnsMutation, SubmitAcceptAnsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitAcceptAnsMutation, SubmitAcceptAnsMutationVariables>(SubmitAcceptAnsDocument, options);
      }
export type SubmitAcceptAnsMutationHookResult = ReturnType<typeof useSubmitAcceptAnsMutation>;
export type SubmitAcceptAnsMutationResult = Apollo.MutationResult<SubmitAcceptAnsMutation>;
export type SubmitAcceptAnsMutationOptions = Apollo.BaseMutationOptions<SubmitAcceptAnsMutation, SubmitAcceptAnsMutationVariables>;
export const FetchQuestionsDocument = gql`
    query fetchQuestions($sortBy: QuestionSortBy!, $page: Int!, $limit: Int!, $filterByTag: String, $filterBySearch: String) {
  getQuestions(
    sortBy: $sortBy
    page: $page
    limit: $limit
    filterByTag: $filterByTag
    filterBySearch: $filterBySearch
  ) {
    totalCount
    currentPage
    pageSize
    search
    tag
    sortBy
    questions {
      id
      author {
        ...AuthorDetails
      }
      title
      body
      tags
      points
      views
      createdAt
      updatedAt
      answerCount
    }
  }
}
    ${AuthorDetailsFragmentDoc}`;

/**
 * __useFetchQuestionsQuery__
 *
 * To run a query within a React component, call `useFetchQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchQuestionsQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      filterByTag: // value for 'filterByTag'
 *      filterBySearch: // value for 'filterBySearch'
 *   },
 * });
 */
export function useFetchQuestionsQuery(baseOptions: Apollo.QueryHookOptions<FetchQuestionsQuery, FetchQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchQuestionsQuery, FetchQuestionsQueryVariables>(FetchQuestionsDocument, options);
      }
export function useFetchQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchQuestionsQuery, FetchQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchQuestionsQuery, FetchQuestionsQueryVariables>(FetchQuestionsDocument, options);
        }
export type FetchQuestionsQueryHookResult = ReturnType<typeof useFetchQuestionsQuery>;
export type FetchQuestionsLazyQueryHookResult = ReturnType<typeof useFetchQuestionsLazyQuery>;
export type FetchQuestionsQueryResult = Apollo.QueryResult<FetchQuestionsQuery, FetchQuestionsQueryVariables>;
export const FetchQuestionDocument = gql`
    query fetchQuestion($quesId: ID!) {
  viewQuestion(quesId: $quesId) {
    id
    author {
      ...AuthorDetails
    }
    title
    body
    tags
    points
    views
    createdAt
    updatedAt
    answers {
      ...AnswerDetails
    }
    comments {
      ...CommentDetails
    }
    acceptedAnswer
    voted
  }
}
    ${AuthorDetailsFragmentDoc}
${AnswerDetailsFragmentDoc}
${CommentDetailsFragmentDoc}`;

/**
 * __useFetchQuestionQuery__
 *
 * To run a query within a React component, call `useFetchQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchQuestionQuery({
 *   variables: {
 *      quesId: // value for 'quesId'
 *   },
 * });
 */
export function useFetchQuestionQuery(baseOptions: Apollo.QueryHookOptions<FetchQuestionQuery, FetchQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchQuestionQuery, FetchQuestionQueryVariables>(FetchQuestionDocument, options);
      }
export function useFetchQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchQuestionQuery, FetchQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchQuestionQuery, FetchQuestionQueryVariables>(FetchQuestionDocument, options);
        }
export type FetchQuestionQueryHookResult = ReturnType<typeof useFetchQuestionQuery>;
export type FetchQuestionLazyQueryHookResult = ReturnType<typeof useFetchQuestionLazyQuery>;
export type FetchQuestionQueryResult = Apollo.QueryResult<FetchQuestionQuery, FetchQuestionQueryVariables>;
export const FetchUserDocument = gql`
    query fetchUser($username: String!) {
  getUser(username: $username) {
    id
    username
    role
    createdAt
    rep
    totalQuestions
    totalAnswers
    recentQuestions {
      id
      title
      points
      createdAt
    }
    recentAnswers {
      id
      title
      points
      createdAt
    }
  }
}
    `;

/**
 * __useFetchUserQuery__
 *
 * To run a query within a React component, call `useFetchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFetchUserQuery(baseOptions: Apollo.QueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
      }
export function useFetchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
        }
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>;
export type FetchUserLazyQueryHookResult = ReturnType<typeof useFetchUserLazyQuery>;
export type FetchUserQueryResult = Apollo.QueryResult<FetchUserQuery, FetchUserQueryVariables>;
export const FetchAllTagsDocument = gql`
    query fetchAllTags($limit: Int!, $cursor: ID, $filterBySearch: String) {
  getAllTags(limit: $limit, cursor: $cursor, filterBySearch: $filterBySearch) {
    tags {
      name
      id
      questionCount
    }
    nextCursor
  }
}
    `;

/**
 * __useFetchAllTagsQuery__
 *
 * To run a query within a React component, call `useFetchAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllTagsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      filterBySearch: // value for 'filterBySearch'
 *   },
 * });
 */
export function useFetchAllTagsQuery(baseOptions: Apollo.QueryHookOptions<FetchAllTagsQuery, FetchAllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllTagsQuery, FetchAllTagsQueryVariables>(FetchAllTagsDocument, options);
      }
export function useFetchAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllTagsQuery, FetchAllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllTagsQuery, FetchAllTagsQueryVariables>(FetchAllTagsDocument, options);
        }
export type FetchAllTagsQueryHookResult = ReturnType<typeof useFetchAllTagsQuery>;
export type FetchAllTagsLazyQueryHookResult = ReturnType<typeof useFetchAllTagsLazyQuery>;
export type FetchAllTagsQueryResult = Apollo.QueryResult<FetchAllTagsQuery, FetchAllTagsQueryVariables>;
export const FetchAllUsersDocument = gql`
    query fetchAllUsers {
  getAllUsers {
    id
    username
    createdAt
  }
}
    `;

/**
 * __useFetchAllUsersQuery__
 *
 * To run a query within a React component, call `useFetchAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<FetchAllUsersQuery, FetchAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(FetchAllUsersDocument, options);
      }
export function useFetchAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllUsersQuery, FetchAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(FetchAllUsersDocument, options);
        }
export type FetchAllUsersQueryHookResult = ReturnType<typeof useFetchAllUsersQuery>;
export type FetchAllUsersLazyQueryHookResult = ReturnType<typeof useFetchAllUsersLazyQuery>;
export type FetchAllUsersQueryResult = Apollo.QueryResult<FetchAllUsersQuery, FetchAllUsersQueryVariables>;