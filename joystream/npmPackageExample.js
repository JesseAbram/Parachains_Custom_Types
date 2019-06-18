const { ApiPromise, WsProvider } = require("@polkadot/api");
const { registerJoystreamTypes } = require('@joystream/types');


 const getApi = async () => {
  // Initialise the provider to connect to the local node
  const joystreamWSS = "";
  const provider = new WsProvider(`${joystreamWSS}`);
  registerJoystreamTypes();
  // Create the API and wait until ready
  const api = await ApiPromise.create(provider);


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
