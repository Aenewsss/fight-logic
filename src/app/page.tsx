import Diferentials from "@/sections/diferentials";
import Feedbacks from "@/sections/feedbacks";
import Top from "@/sections/top";

export default function Home() {
  return (
    <main className="pb-10">
      <Top />
      <Diferentials />
      <Feedbacks />
    </main>
  );
}
