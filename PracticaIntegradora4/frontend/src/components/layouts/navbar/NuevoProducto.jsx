import { Link } from "react-router-dom";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
export const NuevoProducto = () => {
  return (
    <div>
      <Link to="/NuevoProducto">
        <PostAddOutlinedIcon fontSize="large"/>
      </Link>
    </div>
  );
};
