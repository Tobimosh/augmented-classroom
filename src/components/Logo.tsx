

interface Image{
    width: number;
}
const Logo = ({width}: Image) => {
  return (
    <div className="flex items-center">
      <img className="mt-4 mb-4" width={width} src="/bulb.png" alt="" />
      <span className="lg:text-3xl text-xl boldPoppins text-blue-500">
        VirtuLearn
      </span>
    </div>
  );
}

export default Logo
