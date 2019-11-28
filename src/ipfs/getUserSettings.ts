import getIpfsWithConfig from "get-ipfs";

export type CID = string;

const bootstrapNodeWSS =
    process.env.REACT_APP_BOOTSTRAP_NODE_WSS ||
    "/dns4/ipfs.runfission.com/tcp/4003/wss/ipfs/QmVLEz2SxoNiFnuyLpbXsH6SvjPTrHNMU88vCQZyhgBzgw";
const bootstrapNodeTCP =
    process.env.REACT_APP_BOOTSTRAP_NODE_TCP ||
    "/ip4/3.215.160.238/tcp/4001/ipfs/QmVLEz2SxoNiFnuyLpbXsH6SvjPTrHNMU88vCQZyhgBzgw";

export const DEFAULT_CID =
    process.env.REACT_APP_DEFAULT_CID ||
    "QmUWWqCNSdZmus7mc52um5cpqUi1CaE97AzBTY7iWfBXV9";

const getIpfs = async () => {
    return getIpfsWithConfig({
        localPeers: [bootstrapNodeTCP],
        browserPeers: [bootstrapNodeWSS]
    });
};

export const loadUserSettings = async (cid: CID) => {
    const ipfs = await getIpfs();
    let resp, userSettings;
    try {
        resp = await ipfs.cat(cid);
    } catch (err) {
        throw new Error("CID not found: " + cid);
    }
    try {
        userSettings = JSON.parse(resp);
    } catch (err) {
        throw new Error("CID does not contain preferences");
    }
    return userSettings;
};
