interface Props {
  name: string;
  imageUrl: string;
  onClick?: () => void;
}

const Card = ({ name, imageUrl }: Props) => {
  return (
    <div className="max-w-xl mx-auto bg-white  rounded-lg overflow-hidden shadow-lg ">
      <div className="h-full">
        <img src={imageUrl} alt={name} className="w-full h-2/3 object-cover" />

        <div className="">
          <button className="block w-full bg-red-100 py-3 text-2xl">
            {name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
