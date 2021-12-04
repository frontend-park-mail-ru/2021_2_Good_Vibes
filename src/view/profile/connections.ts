import { Connection } from "../../types";
import * as profile from "./callbacks";

const connections: Connection[] = [
  {
    event: "signOut button click",
    callback: profile.signOutRequest,
  },
  {
    event: "profile shown",
    callback: [profile.fieldsFill, profile.ordersListRequest],
  },
  {
    event: "update button click",
    callback: [profile.profileUploadRequest, profile.avatarUploadRequest],
  },
  {
    event: "orders list confirmed",
    callback: profile.parseResponse,
  },
  {
    event: "show orders list",
    callback: profile.showOrderList,
  },
  /* {
    event: "orders link click",
    callback: profile.ordersStateRequest,
  }, */
  // {
  //   event: 'profile link click',
  //   callback: profile.
  // }
];

export default connections;
