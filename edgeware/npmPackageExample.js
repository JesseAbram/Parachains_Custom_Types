const { ApiPromise, WsProvider } = require("@polkadot/api");
const { IdentityTypes } = require('edgeware-node-types/dist/identity.js');
const { VotingTypes } = require('edgeware-node-types/dist/voting.js');
const { GovernanceTypes } = require('edgeware-node-types/dist/governance.js');


 const getApi = async () => {

  
  // Initialise the provider to connect to the local node
  const provider = new WsProvider("wss://testnode.edgewa.re");

  // Create the API and wait until ready
  const api = await ApiPromise.create( {
      provider,
      types : {
        ...IdentityTypes,
        ...GovernanceTypes,
        ...VotingTypes,
      },
  });


  
  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(
    `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
  );
  process.exit()
}




getApi()