interface Props {
  name: string;
  imageUrl: string;
  onClick?: () => void;
}

const Card = ({ name, imageUrl }: Props) => {
  return (
    <div className="w-lg  bg-white h-[400px] flex flex-col justify-between rounded-lg  shadow-lg ">
      <div className="flex flex-col justify-between h-full">
        <img src={imageUrl} alt={name} className="h-2/3 flex-grow w-full object-cover " />

        <div className="">
          <button className=" w-full bg-red-100 py-3 text-2xl">
            {name}
          </button>
        </div>
      </div>
    
    </div>
  );
};

export default Card;
