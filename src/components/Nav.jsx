import bhittaOutline from "../assets/bhitta-outline.png";

export default function Nav() {
  return (
    <div className="w-[100vw] bg-black">
      <div className="w-[90vw] mx-auto flex justify-start h-[16vh]">
        <div className=" flex w-[15vw] min-w-[9rem] items-center justify-center">
          <img
            src={bhittaOutline}
            alt=""
            className="w-[100%] h-[90%] min-h-[12vh] min-w-[13vw] object-contain" // Set a fixed width and height
          />
        </div>
      </div>
    </div>
  );
}
