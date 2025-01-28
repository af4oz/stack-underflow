import { initializeApollo } from "lib/apollo";

const Index = () => {
    return (
      <div>
        <h1> Hello</h1>
      </div>
    );
  };

export async function getServerSideProps() {
    const apolloClient = initializeApollo();
  
    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
  
  export default Index;
  