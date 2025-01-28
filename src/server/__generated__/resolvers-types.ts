import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Answer: ResolverTypeWrapper<Answer>;
  AnswerVotes: ResolverTypeWrapper<AnswerVotes>;
  Author: ResolverTypeWrapper<Author>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentParentType: CommentParentType;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GetAllTagsResult: ResolverTypeWrapper<GetAllTagsResult>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoggedUser: ResolverTypeWrapper<LoggedUser>;
  Mutation: ResolverTypeWrapper<{}>;
  NextPrevPage: ResolverTypeWrapper<NextPrevPage>;
  PaginatedQuesList: ResolverTypeWrapper<PaginatedQuesList>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  QuestionSortBy: QuestionSortBy;
  QuestionVotes: ResolverTypeWrapper<QuestionVotes>;
  RecentActivity: ResolverTypeWrapper<RecentActivity>;
  RoleType: RoleType;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  User: ResolverTypeWrapper<User>;
  VoteType: VoteType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  AnswerVotes: AnswerVotes;
  Author: Author;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  GetAllTagsResult: GetAllTagsResult;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoggedUser: LoggedUser;
  Mutation: {};
  NextPrevPage: NextPrevPage;
  PaginatedQuesList: PaginatedQuesList;
  Query: {};
  Question: Question;
  QuestionVotes: QuestionVotes;
  RecentActivity: RecentActivity;
  String: Scalars['String'];
  Tag: Tag;
  User: User;
};

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  voted?: Resolver<Maybe<ResolversTypes['VoteType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnswerVotesResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnswerVotes'] = ResolversParentTypes['AnswerVotes']> = {
  ansId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  vote?: Resolver<ResolversTypes['VoteType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GetAllTagsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetAllTagsResult'] = ResolversParentTypes['GetAllTagsResult']> = {
  nextCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoggedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedUser'] = ResolversParentTypes['LoggedUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptAnswer?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<MutationAcceptAnswerArgs, 'ansId' | 'quesId'>>;
  addComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'body' | 'parentId' | 'parentType'>>;
  deleteAnswer?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteAnswerArgs, 'ansId' | 'quesId'>>;
  deleteComment?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId'>>;
  deleteQuestion?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteQuestionArgs, 'quesId'>>;
  editAnswer?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationEditAnswerArgs, 'ansId' | 'body' | 'quesId'>>;
  editComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationEditCommentArgs, 'body' | 'commentId'>>;
  editQuestion?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<MutationEditQuestionArgs, 'body' | 'quesId' | 'tags' | 'title'>>;
  login?: Resolver<ResolversTypes['LoggedUser'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  postAnswer?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationPostAnswerArgs, 'body' | 'quesId'>>;
  postQuestion?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<MutationPostQuestionArgs, 'body' | 'tags' | 'title'>>;
  register?: Resolver<ResolversTypes['LoggedUser'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'password' | 'username'>>;
  voteAnswer?: Resolver<ResolversTypes['Answer'], ParentType, ContextType, RequireFields<MutationVoteAnswerArgs, 'ansId' | 'quesId' | 'voteType'>>;
  voteQuestion?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<MutationVoteQuestionArgs, 'quesId' | 'voteType'>>;
};

export type NextPrevPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['NextPrevPage'] = ResolversParentTypes['NextPrevPage']> = {
  limit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedQuesListResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedQuesList'] = ResolversParentTypes['PaginatedQuesList']> = {
  currentPage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  questions?: Resolver<Array<Maybe<ResolversTypes['Question']>>, ParentType, ContextType>;
  search?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortBy?: Resolver<ResolversTypes['QuestionSortBy'], ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllTags?: Resolver<ResolversTypes['GetAllTagsResult'], ParentType, ContextType, RequireFields<QueryGetAllTagsArgs, 'limit'>>;
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getQuestions?: Resolver<ResolversTypes['PaginatedQuesList'], ParentType, ContextType, RequireFields<QueryGetQuestionsArgs, 'limit' | 'page'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'username'>>;
  viewQuestion?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<QueryViewQuestionArgs, 'quesId'>>;
  whoami?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  acceptedAnswer?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  answerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  answers?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType>;
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  downvoteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hotAlgo?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  upvoteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  voted?: Resolver<Maybe<ResolversTypes['VoteType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuestionVotesResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuestionVotes'] = ResolversParentTypes['QuestionVotes']> = {
  quesId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  vote?: Resolver<ResolversTypes['VoteType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecentActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecentActivity'] = ResolversParentTypes['RecentActivity']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  answers?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
  recentAnswers?: Resolver<Array<ResolversTypes['RecentActivity']>, ParentType, ContextType>;
  recentQuestions?: Resolver<Array<ResolversTypes['RecentActivity']>, ParentType, ContextType>;
  rep?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['RoleType'], ParentType, ContextType>;
  totalAnswers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalQuestions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Answer?: AnswerResolvers<ContextType>;
  AnswerVotes?: AnswerVotesResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  GetAllTagsResult?: GetAllTagsResultResolvers<ContextType>;
  LoggedUser?: LoggedUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NextPrevPage?: NextPrevPageResolvers<ContextType>;
  PaginatedQuesList?: PaginatedQuesListResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  QuestionVotes?: QuestionVotesResolvers<ContextType>;
  RecentActivity?: RecentActivityResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

