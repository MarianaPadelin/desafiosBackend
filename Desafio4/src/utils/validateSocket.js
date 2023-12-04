function validateSocket({
  title,
  description,
  price,
  code,
  category,
  stock,
}) {
  if (!title) {
    console.log("Title is required")
    return false
  }

  if (!description) {
    console.log("Description is required");
    return false;
  }

  if (!price) {
     console.log("Price is required");
     return false;
  }

  if (!code) {
  console.log("Code is required");
  return false;
  }

  if (!category) {
   console.log("Category is required");
   return false;
  }

  if (!stock) {
     console.log("Stock is required");
     return false;

  } else {
    console.log("Product validated")
    return true;
  }
}

export { validateSocket };
