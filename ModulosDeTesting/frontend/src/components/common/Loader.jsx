import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop:"20vh"
        }}
      >
        <PulseLoader
          className="loader"
          color="CadetBlue"
          margin={30}
          size={30}
        />
      </div>
  );
};

export default Loader;
