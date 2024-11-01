import Pointer from "@/components/pointer";
import Pomodoro from "@/components/pomodoro";

import Image from "next/image";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Image
          src="/wallpaper.jpg"
          fill
          alt="hero"
          className="object-cover brightness-50 object-center"
        />
      </div>

      <Pointer />
      <div className="w-full flex p-4 h-screen relative z-10">
        <div className="flex max-w-[1200px] justify-between items-centers w-full mx-auto ">
          <Pomodoro />
        </div>
      </div>
    </div>
  );
}
