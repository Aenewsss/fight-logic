import Contact from "@/sections/contact";
import Diferentials from "@/sections/diferentials";
import Feedbacks from "@/sections/feedbacks";
import FoundingMember from "@/sections/founding-member";
import Schedule from "@/sections/schedule";
import Teams from "@/sections/teams";
import Top from "@/sections/top";
import Gallery from "@/sections/gallery";
import PrivateClass from "@/sections/private-class";
import Competition from "@/sections/competition";

export default function Home() {
  return (
    <main className="pb-10">
      <Top />
      <Gallery />
      <Diferentials />
      <FoundingMember />
      <Feedbacks />
      <PrivateClass />
      <Teams />
      <Schedule />
      <Contact />
      <Competition />
    </main>
  );
}
