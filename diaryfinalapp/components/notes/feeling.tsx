import { eFeelings } from "~/firebase/types/iNote";
import {
  Angry,
  CircleHelp,
  Frown,
  Laugh,
  Meh,
  Smile,
} from "lucide-react-native";

export function Feeling({ feeling }: { feeling: eFeelings }) {
  if (feeling === eFeelings.NEUTRAL) {
    return <Meh color={"orange"} />;
  } else if (feeling === eFeelings.HAPPY) {
    return <Smile color={"green"} />;
  } else if (feeling === eFeelings.VERY_HAPPY) {
    return <Laugh color={"#4184F6"} />;
  } else if (feeling === eFeelings.SAD) {
    return <Frown color={"brown"} />;
  } else if (feeling === eFeelings.ANGRY) {
    return <Angry color={"red"} />;
  } else {
    return <CircleHelp color={"black"} />;
  }
}
