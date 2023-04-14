import Random from "./components/Random";
import Tag from "./components/Tag";

export default function App() {
  return (
    <div className="w-full h-full flex flex-col items-center background pb-[5rem]"> 
      <h1 className="w-[95%] text-center text-[1.75rem] font-semibold bg-white rounded-lg mt-5 py-2">Random GIFS</h1>

      <div className="w-full flex flex-col items-center gap-y-10">
        <Random/>
        <Tag/>
      </div>


    </div>
  );
}
