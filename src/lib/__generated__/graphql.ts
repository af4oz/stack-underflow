/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Answer = {
  __typename?: 'Answer';
  author: Author;
  body: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  points: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  voted?: Maybe<VoteType>;
};

export type AnswerVotes = {
  __typename?: 'AnswerVotes';
  ansId: Scalars['ID'];
  userId: Scalars['ID'];
  vote: VoteType;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: Author;
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export enum CommentParentType {
  Answer = 'Answer',
  Question = 'Question'
}

export type GetAllTagsResult = {
  __typename?: 'GetAllTagsResult';
  nextCursor: Scalars['String'];
  tags: Array<Tag>;
};

export type LoggedUser = {
  __typename?: 'LoggedUser';
  id: Scalars['ID'];
  role: Scalars['String'];
  token: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptAnswer: Question;
  addComment: Comment;
  deleteAnswer: Scalars['ID'];
  deleteComment: Scalars['ID'];
  deleteQuestion: Scalars['ID'];
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
  ansId: Scalars['ID'];
  quesId: Scalars['ID'];
};


export type MutationAddCommentArgs = {
  body: Scalars['String'];
  parentId: Scalars['ID'];
  parentType: CommentParentType;
};


export type MutationDeleteAnswerArgs = {
  ansId: Scalars['ID'];
  quesId: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationDeleteQuestionArgs = {
  quesId: Scalars['ID'];
};


export type MutationEditAnswerArgs = {
  ansId: Scalars['ID'];
  body: Scalars['String'];
  quesId: Scalars['ID'];
};


export type MutationEditCommentArgs = {
  body: Scalars['String'];
  commentId: Scalars['ID'];
};


export type MutationEditQuestionArgs = {
  body: Scalars['String'];
  quesId: Scalars['ID'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationPostAnswerArgs = {
  body: Scalars['String'];
  quesId: Scalars['ID'];
};


export type MutationPostQuestionArgs = {
  body: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationVoteAnswerArgs = {
  ansId: Scalars['ID'];
  quesId: Scalars['ID'];
  voteType: VoteType;
};


export type MutationVoteQuestionArgs = {
  quesId: Scalars['ID'];
  voteType: VoteType;
};

export type NextPrevPage = {
  __typename?: 'NextPrevPage';
  limit: Scalars['Float'];
  page: Scalars['Float'];
};

export type PaginatedQuesList = {
  __typename?: 'PaginatedQuesList';
  currentPage: Scalars['Float'];
  pageSize: Scalars['Float'];
  questions: Array<Maybe<Question>>;
  search?: Maybe<Scalars['String']>;
  sortBy: QuestionSortBy;
  tag?: Maybe<Scalars['String']>;
  totalCount: Scalars['Float'];
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
  cursor?: InputMaybe<Scalars['ID']>;
  filterBySearch?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetQuestionsArgs = {
  filterBySearch?: InputMaybe<Scalars['String']>;
  filterByTag?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  sortBy?: InputMaybe<QuestionSortBy>;
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryViewQuestionArgs = {
  quesId: Scalars['ID'];
};

export type Question = {
  __typename?: 'Question';
  acceptedAnswer?: Maybe<Scalars['ID']>;
  answerCount: Scalars['Int'];
  answers: Array<Answer>;
  author: Author;
  body: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  downvoteCount: Scalars['Int'];
  hotAlgo: Scalars['Float'];
  id: Scalars['ID'];
  points: Scalars['Int'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  upvoteCount: Scalars['Int'];
  views: Scalars['Int'];
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
  quesId: Scalars['ID'];
  userId: Scalars['ID'];
  vote: VoteType;
};

export type RecentActivity = {
  __typename?: 'RecentActivity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  points: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export enum RoleType {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  questionCount: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  answers: Array<Answer>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  questions: Array<Question>;
  recentAnswers: Array<RecentActivity>;
  recentQuestions: Array<RecentActivity>;
  rep: Scalars['Int'];
  role: RoleType;
  totalAnswers: Scalars['Int'];
  totalQuestions: Scalars['Int'];
  username: Scalars['String'];
};

export enum VoteType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}

export type AuthorDetailsFragment = { __typename?: 'Author', id: string, username: string } & { ' $fragmentName'?: 'AuthorDetailsFragment' };

export type AnswerDetailsFragment = { __typename?: 'Answer', id: string, body: string, points: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorDetailsFragment': AuthorDetailsFragment } }
  ), comments: Array<(
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentDetailsFragment': CommentDetailsFragment } }
  )> } & { ' $fragmentName'?: 'AnswerDetailsFragment' };

export type QuestionDetailsFragment = { __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, acceptedAnswer?: string | null, voted?: VoteType | null, createdAt: any, updatedAt: any, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorDetailsFragment': AuthorDetailsFragment } }
  ), comments: Array<(
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentDetailsFragment': CommentDetailsFragment } }
  )>, answers: Array<(
    { __typename?: 'Answer' }
    & { ' $fragmentRefs'?: { 'AnswerDetailsFragment': AnswerDetailsFragment } }
  )> } & { ' $fragmentName'?: 'QuestionDetailsFragment' };

export type PostQuestionDetailsFragment = { __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, voted?: VoteType | null, createdAt: any, updatedAt: any, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorDetailsFragment': AuthorDetailsFragment } }
  ) } & { ' $fragmentName'?: 'PostQuestionDetailsFragment' };

export type LoggedUserDetailsFragment = { __typename?: 'LoggedUser', id: string, username: string, role: string, token: string } & { ' $fragmentName'?: 'LoggedUserDetailsFragment' };

export type CommentDetailsFragment = { __typename?: 'Comment', id: string, body: string, createdAt: any, updatedAt: any, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorDetailsFragment': AuthorDetailsFragment } }
  ) } & { ' $fragmentName'?: 'CommentDetailsFragment' };

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: (
    { __typename?: 'LoggedUser' }
    & { ' $fragmentRefs'?: { 'LoggedUserDetailsFragment': LoggedUserDetailsFragment } }
  ) };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: (
    { __typename?: 'LoggedUser' }
    & { ' $fragmentRefs'?: { 'LoggedUserDetailsFragment': LoggedUserDetailsFragment } }
  ) };

export type AddQuestionMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddQuestionMutation = { __typename?: 'Mutation', postQuestion: (
    { __typename?: 'Question' }
    & { ' $fragmentRefs'?: { 'PostQuestionDetailsFragment': PostQuestionDetailsFragment } }
  ) };

export type UpdateQuestionMutationVariables = Exact<{
  quesId: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', editQuestion: (
    { __typename?: 'Question' }
    & { ' $fragmentRefs'?: { 'QuestionDetailsFragment': QuestionDetailsFragment } }
  ) };

export type RemoveQuestionMutationVariables = Exact<{
  quesId: Scalars['ID'];
}>;


export type RemoveQuestionMutation = { __typename?: 'Mutation', deleteQuestion: string };

export type SubmitQuesVoteMutationVariables = Exact<{
  quesId: Scalars['ID'];
  voteType: VoteType;
}>;


export type SubmitQuesVoteMutation = { __typename?: 'Mutation', voteQuestion: { __typename?: 'Question', id: string, voted?: VoteType | null, points: number } };

export type AddCommentMutationVariables = Exact<{
  parentId: Scalars['ID'];
  parentType: CommentParentType;
  body: Scalars['String'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentDetailsFragment': CommentDetailsFragment } }
  ) };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
  body: Scalars['String'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentDetailsFragment': CommentDetailsFragment } }
  ) };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: string };

export type AddAnswerMutationVariables = Exact<{
  quesId: Scalars['ID'];
  body: Scalars['String'];
}>;


export type AddAnswerMutation = { __typename?: 'Mutation', postAnswer: Array<(
    { __typename?: 'Answer' }
    & { ' $fragmentRefs'?: { 'AnswerDetailsFragment': AnswerDetailsFragment } }
  )> };

export type UpdateAnswerMutationVariables = Exact<{
  quesId: Scalars['ID'];
  ansId: Scalars['ID'];
  body: Scalars['String'];
}>;


export type UpdateAnswerMutation = { __typename?: 'Mutation', editAnswer: Array<(
    { __typename?: 'Answer' }
    & { ' $fragmentRefs'?: { 'AnswerDetailsFragment': AnswerDetailsFragment } }
  )> };

export type RemoveAnswerMutationVariables = Exact<{
  quesId: Scalars['ID'];
  ansId: Scalars['ID'];
}>;


export type RemoveAnswerMutation = { __typename?: 'Mutation', deleteAnswer: string };

export type SubmitAnsVoteMutationVariables = Exact<{
  quesId: Scalars['ID'];
  ansId: Scalars['ID'];
  voteType: VoteType;
}>;


export type SubmitAnsVoteMutation = { __typename?: 'Mutation', voteAnswer: { __typename?: 'Answer', id: string, voted?: VoteType | null, points: number } };

export type SubmitAcceptAnsMutationVariables = Exact<{
  quesId: Scalars['ID'];
  ansId: Scalars['ID'];
}>;


export type SubmitAcceptAnsMutation = { __typename?: 'Mutation', acceptAnswer: { __typename?: 'Question', id: string, acceptedAnswer?: string | null } };

export type FetchQuestionsQueryVariables = Exact<{
  sortBy: QuestionSortBy;
  page: Scalars['Int'];
  limit: Scalars['Int'];
  filterByTag?: InputMaybe<Scalars['String']>;
  filterBySearch?: InputMaybe<Scalars['String']>;
}>;


export type FetchQuestionsQuery = { __typename?: 'Query', getQuestions: { __typename?: 'PaginatedQuesList', totalCount: number, currentPage: number, pageSize: number, search?: string | null, tag?: string | null, sortBy: QuestionSortBy, questions: Array<{ __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, createdAt: any, updatedAt: any, answerCount: number, author: (
        { __typename?: 'Author' }
        & { ' $fragmentRefs'?: { 'AuthorDetailsFragment': AuthorDetailsFragment } }
      ) } | null> } };

export type FetchQuestionQueryVariables = Exact<{
  quesId: Scalars['ID'];
}>;


export type FetchQuestionQuery = { __typename?: 'Query', viewQuestion: { __typename?: 'Question', id: string, title: string, body: string, tags: Array<string>, points: number, views: number, createdAt: any, updatedAt: any, acceptedAnswer?: string | null, voted?: VoteType | null, author: (
      { __typename?: 'Author' }
      & { ' $fragmentRefs'?: { 'AuthorDetailsFragment': AuthorDetailsFragment } }
    ), answers: Array<(
      { __typename?: 'Answer' }
      & { ' $fragmentRefs'?: { 'AnswerDetailsFragment': AnswerDetailsFragment } }
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & { ' $fragmentRefs'?: { 'CommentDetailsFragment': CommentDetailsFragment } }
    )> } };

export type FetchUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type FetchUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, username: string, role: RoleType, createdAt: any, rep: number, totalQuestions: number, totalAnswers: number, recentQuestions: Array<{ __typename?: 'RecentActivity', id: string, title?: string | null, points: number, createdAt: any }>, recentAnswers: Array<{ __typename?: 'RecentActivity', id: string, title?: string | null, points: number, createdAt: any }> } };

export type FetchAllTagsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['ID']>;
  filterBySearch?: InputMaybe<Scalars['String']>;
}>;


export type FetchAllTagsQuery = { __typename?: 'Query', getAllTags: { __typename?: 'GetAllTagsResult', nextCursor: string, tags: Array<{ __typename?: 'Tag', name: string, id: string, questionCount: number }> } };

export type FetchAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }> };

export const AuthorDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<AuthorDetailsFragment, unknown>;
export const CommentDetailsFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},...AuthorDetailsFragmentDoc.definitions]} as unknown as DocumentNode<CommentDetailsFragment, unknown>;
export const AnswerDetailsFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnswerDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Answer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"voted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},...AuthorDetailsFragmentDoc.definitions,...CommentDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AnswerDetailsFragment, unknown>;
export const QuestionDetailsFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QuestionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedAnswer"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnswerDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},...AuthorDetailsFragmentDoc.definitions,...CommentDetailsFragmentDoc.definitions,...AnswerDetailsFragmentDoc.definitions]} as unknown as DocumentNode<QuestionDetailsFragment, unknown>;
export const PostQuestionDetailsFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostQuestionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Question"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"voted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},...AuthorDetailsFragmentDoc.definitions]} as unknown as DocumentNode<PostQuestionDetailsFragment, unknown>;
export const LoggedUserDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LoggedUserDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoggedUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<LoggedUserDetailsFragment, unknown>;
export const RegisterUserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LoggedUserDetails"}}]}}]}},...LoggedUserDetailsFragmentDoc.definitions]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LoggedUserDetails"}}]}}]}},...LoggedUserDetailsFragmentDoc.definitions]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const AddQuestionDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostQuestionDetails"}}]}}]}},...PostQuestionDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AddQuestionMutation, AddQuestionMutationVariables>;
export const UpdateQuestionDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QuestionDetails"}}]}}]}},...QuestionDetailsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const RemoveQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}}]}]}}]} as unknown as DocumentNode<RemoveQuestionMutation, RemoveQuestionMutationVariables>;
export const SubmitQuesVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitQuesVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"voteType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoteType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voteQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"voteType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"voteType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"voted"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]} as unknown as DocumentNode<SubmitQuesVoteMutation, SubmitQuesVoteMutationVariables>;
export const AddCommentDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentParentType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentDetails"}}]}}]}},...CommentDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>;
export const EditCommentDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentDetails"}}]}}]}},...CommentDetailsFragmentDoc.definitions]} as unknown as DocumentNode<EditCommentMutation, EditCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const AddAnswerDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnswerDetails"}}]}}]}},...AnswerDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AddAnswerMutation, AddAnswerMutationVariables>;
export const UpdateAnswerDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ansId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ansId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ansId"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnswerDetails"}}]}}]}},...AnswerDetailsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateAnswerMutation, UpdateAnswerMutationVariables>;
export const RemoveAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ansId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ansId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ansId"}}}]}]}}]} as unknown as DocumentNode<RemoveAnswerMutation, RemoveAnswerMutationVariables>;
export const SubmitAnsVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitAnsVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ansId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"voteType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoteType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voteAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ansId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ansId"}}},{"kind":"Argument","name":{"kind":"Name","value":"voteType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"voteType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"voted"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]} as unknown as DocumentNode<SubmitAnsVoteMutation, SubmitAnsVoteMutationVariables>;
export const SubmitAcceptAnsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitAcceptAns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ansId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ansId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ansId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedAnswer"}}]}}]}}]} as unknown as DocumentNode<SubmitAcceptAnsMutation, SubmitAcceptAnsMutationVariables>;
export const FetchQuestionsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionSortBy"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterByTag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBySearch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterByTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterByTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBySearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBySearch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"search"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"sortBy"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"answerCount"}}]}}]}}]}},...AuthorDetailsFragmentDoc.definitions]} as unknown as DocumentNode<FetchQuestionsQuery, FetchQuestionsQueryVariables>;
export const FetchQuestionDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quesId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnswerDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptedAnswer"}},{"kind":"Field","name":{"kind":"Name","value":"voted"}}]}}]}},...AuthorDetailsFragmentDoc.definitions,...AnswerDetailsFragmentDoc.definitions,...CommentDetailsFragmentDoc.definitions]} as unknown as DocumentNode<FetchQuestionQuery, FetchQuestionQueryVariables>;
export const FetchUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"rep"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"totalAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"recentQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recentAnswers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<FetchUserQuery, FetchUserQueryVariables>;
export const FetchAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchAllTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBySearch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBySearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBySearch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}}]} as unknown as DocumentNode<FetchAllTagsQuery, FetchAllTagsQueryVariables>;
export const FetchAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FetchAllUsersQuery, FetchAllUsersQueryVariables>;