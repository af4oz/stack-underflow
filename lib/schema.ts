const typeDefs = /* GraphQL */ `
  type LoggedUser {
    id: ID!
    username: String!
    token: String!
    role: String!
  }

  type Author {
    id: ID!
    username: String!
  }

  type NextPrevPage {
    page: Float!
    limit: Float!
  }

  type Comment {
    id: ID!
    author: Author!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the \`date-time\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
  scalar DateTime

  type Answer {
    id: ID!
    author: Author!
    body: String!
    comments: [Comment!]!
    points: Int!
    voted: VoteType
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum VoteType {
    DOWNVOTE
    UPVOTE
  }

  type AnswerVotes {
    userId: ID!
    ansId: ID!
    vote: VoteType!
  }

  type Question {
    id: ID!
    author: Author!
    title: String!
    body: String!
    tags: [String!]!
    comments: [Comment!]!
    answers: [Answer!]!
    answerCount: Int!
    points: Int!
    views: Int!
    hotAlgo: Float!
    acceptedAnswer: ID
    voted: VoteType
    createdAt: DateTime!
    updatedAt: DateTime!
    upvoteCount: Int!
    downvoteCount: Int!
  }

  type RecentActivity {
    id: ID!
    title: String
    points: Int!
    createdAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    role: RoleType!
    questions: [Question!]!
    answers: [Answer!]!
    createdAt: DateTime!
    rep: Int!
    recentQuestions: [RecentActivity!]!
    recentAnswers: [RecentActivity!]!
    totalQuestions: Int!
    totalAnswers: Int!
  }

  enum RoleType {
    USER
    ADMIN
  }

  type QuestionVotes {
    userId: ID!
    quesId: ID!
    vote: VoteType!
  }

  type Tag {
    id: ID!
    name: String!
    questionCount: Int!
  }

  type PaginatedQuesList {
    questions: [Question]!
    totalCount: Float!
    currentPage: Float!
    pageSize: Float!
    tag: String
    sortBy: QuestionSortBy!
    search: String
  }

  enum QuestionSortBy {
    HOT
    VOTES
    VIEWS
    NEWEST
    OLDEST
  }

  type GetAllTagsResult {
    tags: [Tag!]!
    nextCursor: String!
  }

  type Query {
    getQuestions(
      page: Int!
      limit: Int!
      sortBy: QuestionSortBy
      filterByTag: String
      filterBySearch: String
    ): PaginatedQuesList!
    viewQuestion(quesId: ID!): Question!
    getAllTags(
      limit: Int = 10
      cursor: ID
      filterBySearch: String
    ): GetAllTagsResult!
    whoami: User!
    getUser(username: String!): User!
    getAllUsers: [User!]!
  }

  type Mutation {
    postAnswer(body: String!, quesId: ID!): [Answer!]!
    deleteAnswer(ansId: ID!, quesId: ID!): ID!
    editAnswer(body: String!, ansId: ID!, quesId: ID!): [Answer!]!
    voteAnswer(voteType: VoteType!, ansId: ID!, quesId: ID!): Answer!
    acceptAnswer(ansId: ID!, quesId: ID!): Question!
    addComment(
      body: String!
      parentId: ID!
      parentType: CommentParentType!
    ): Comment!
    deleteComment(commentId: ID!): ID!
    editComment(body: String!, commentId: ID!): Comment!
    postQuestion(tags: [String!]!, body: String!, title: String!): Question!
    deleteQuestion(quesId: ID!): ID!
    editQuestion(
      tags: [String!]!
      body: String!
      title: String!
      quesId: ID!
    ): Question!
    voteQuestion(voteType: VoteType!, quesId: ID!): Question!
    register(password: String!, username: String!): LoggedUser!
    login(password: String!, username: String!): LoggedUser!
  }

  enum CommentParentType {
    Question
    Answer
  }
`;

export default typeDefs;
