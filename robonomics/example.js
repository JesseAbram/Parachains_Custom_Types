const { ApiPromise, WsProvider } = require("@polkadot/api");

 const getApi = async () => {
  // Initialise the provider to connect to the local node
  const robonomicsWSS = "";
  const provider = new WsProvider(`${robonomicsWSS}`);

  // Create the API and wait until ready
  const api = await ApiPromise.create( {
      provider,
      types : {
      Order: {
        model: "Vec<u8>",
        objective: "Vec<u8>",
        cost: "Balance"
      },
      "Demand": {
        order: "Order",
        sender: "AccountId"
      },
      Offer: {
        order: "Order",
        sender: "AccountId"
      },
      Liability: {
        order: "Order",
        promisee: "AccountId",
        promisor: "AccountId",
        result: "Option<Vec<u8>>"
      },
      LiabilityIndex: "u64"}
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
