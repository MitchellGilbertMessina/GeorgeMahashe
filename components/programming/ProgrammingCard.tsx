import type { ProgrammingItem } from "@/types/programming";

import ResidencyCard from "./cards/ResidencyCard";
import EventCard from "./cards/EventCard";
import ExhibitionCard from "./cards/ExhibitionCard";

export default function ProgrammingCard({
  item,
}: {
  item: ProgrammingItem;
}) {
  switch (item.category) {
    case "residency":
      return <ResidencyCard item={item} />;

    case "event":
      return <EventCard item={item} />;

    case "exhibition":
      return <ExhibitionCard item={item} />;

    default:
      return null;
  }
}