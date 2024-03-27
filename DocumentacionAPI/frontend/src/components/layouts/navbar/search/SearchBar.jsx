import { Box, TextField } from "@mui/material";
import { Button } from "react-bootstrap";


const SearchBar = ({ handleSubmit, handleChange }) => {
  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      className="d-flex"
    >
      <TextField
        placeholder="Buscar producto"
        onChange={handleChange}
        name="searchbar"
        variant="outlined"
        size="small"
        style={{
          backgroundColor: "lightcoral",
          paddingInline: "1vw",
        }}
      ></TextField>
      <Button variant="outline-dark" type="submit">
        Buscar
      </Button>
    </Box>
  );
};  

export default SearchBar;
