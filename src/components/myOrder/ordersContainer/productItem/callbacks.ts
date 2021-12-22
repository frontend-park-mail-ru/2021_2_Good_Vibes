import bus from "../../../../modules/bus/bus";
import { Callback } from "../../../../types";

// export const cardClick: Callback = () => {
//   bus.emit("card click", undefined);
// };

export const productPageStateRequest: Callback = ({ id }: { id: number }) => {
  bus.emit('product state request', { id });
};
