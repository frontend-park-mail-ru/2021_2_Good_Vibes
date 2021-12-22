import { Connection } from "../../types";
import * as profile from "./callbacks";

const connections: Connection[] = [
  {
    event: "profile shown",
    callback: [
      profile.fieldsFill,
      profile.hideAlert,
    ],
  },
  {
    event: "update button click",
    callback: [
      profile.profileUploadRequest,
      profile.avatarUploadRequest,
      profile.changeInfoDisabled,
    ],
  },
  {
    event: "change button click",
    callback: profile.changeInfo,
  },

  /* {
    event: "orders link click",
    callback: profile.ordersStateRequest,
  }, */
  // {
  //   event: 'profile link click',
  //   callback: profile.
  // }

  // ----------------
  {
    event: 'profile upload confirmed',
    callback: profile.handleUpdateConfirmed,
  },

];

export default connections;
