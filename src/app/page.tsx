import Contact from "@/sections/contact";
import Diferentials from "@/sections/diferentials";
import Feedbacks from "@/sections/feedbacks";
import FoundingMember from "@/sections/founding-member";
import Schedule from "@/sections/schedule";
import Teams from "@/sections/teams";
import Top from "@/sections/top";

export default function Home() {
  return (
    <main className="pb-10">
      <Top />
      <Diferentials />
      <Feedbacks />
      <FoundingMember />
      <Teams />
      <Schedule />
      <Contact />
    </main>
  );
}
