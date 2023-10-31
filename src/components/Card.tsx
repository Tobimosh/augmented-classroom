import { Link } from "react-router-dom";

interface Props {
  name: string;
  imageUrl: string;
  linkUrl: string;
  onClick?: () => void;
}

const Card = ({ name, imageUrl, linkUrl }: Props) => {
  return (
    <Link
      to={linkUrl}
      className="w-full bg-white h-[400px] rounded-lg shadow-lg flex-1 max-w-[400px] min-w-[250px] lg:min-w-[300px]"
    >
      <div className="flex flex-col justify-between h-full">
        <img
          src={imageUrl}
          alt={name}
          className="h-2/3 flex-grow w-full object-cover "
        />

        <div className="">
          <button className=" w-full bg-red-100 py-3 text-2xl">{name}</button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
