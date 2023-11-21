const { ApolloServer } = require("apollo-server"); // Import Apollo Server
const { importSchema } = require("graphql-import"); // Import schema from graphql file
const EtherDataSource = require("./datasource/ethDatasource"); // Import custom data source
const typeDefs = importSchema("./schema.graphql"); // Import schema from graphql file

require("dotenv").config(); // Load environment variables

const resolvers = {
  Query: {
    etherBalanceByAddress: (
      root,
      _args,
      { dataSources }, // Resolver to get ether balance
    ) => dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (
      root,
      _args,
      { dataSources }, // Resolver to get total ether supply
    ) => dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (
      root,
      _args,
      { dataSources }, // Resolver to get latest ether price
    ) => dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (
      root,
      _args,
      { dataSources }, // Resolver to get block confirmation time
    ) => dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  // Create Apollo Server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Pass custom data source
  }),
});

server.timeout = 0; // Set timeout to 0
server.listen("9000").then(({ url }) => {
  // Start server on port 9000
  console.log(`🚀 Server ready at ${url}`);
});
