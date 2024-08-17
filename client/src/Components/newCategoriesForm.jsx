import { useEffect, useState } from "react";

export default function NewCategories() {
  const [category, setCategory] = useState([]);
  const [catForm, setCatForm] = useState({
    name: "",
    colour: "",
  });

  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    const catRes = await fetch("http://localhost:8080/categories");
    const categoryData = await catRes.json();
    setCategory(categoryData);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setCatForm({ ...catForm, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(catForm),
    });
    if (result.ok) {
      location.reload();
      setCatForm({
        name: "",
        colour: "",
      });
    } else {
      console.error("Request Failed");
    }
  }
  return (
    <div className="newCatDiv">
      <h1 className="newCatTitle"> Add New Catagories</h1>
      <form onSubmit={handleSubmit} className="newCatForm">
        <label htmlFor="newCategory" className="catNameLabel">
          {" "}
          Give Your New Category A Name
        </label>
        <input
          className="catNameInput"
          type="text"
          name="name"
          id="newCategory"
          onChange={handleChange}
          value={catForm.name}
          placeholder="Enter category name here..."
        />
        <label htmlFor="newCategoryColour" className="catColorLabel">
          {" "}
          Pick A Colour For Your New Category
        </label>
        <input
          className="catColorInput"
          type="color"
          name="colour"
          id="newCategoryColour"
          onChange={handleChange}
          value={catForm.colour}
        />
        <button className="newCatBtn">Add New Category</button>
      </form>

      <table className="catTable">
        <tbody className="catBody">
          <tr className="THrow">
            <th className="catTableHead">Current Categories List</th>
          </tr>
          <tr>
            <td className="catTableTitle">Category Name</td>
            <td className="catTableTitle">Category Colour</td>
          </tr>
          {category.map((category) => (
            <tr
              key={category.id}
              style={{ backgroundColor: category.colour }}
              className="catTableRow"
            >
              <td>{category.name}</td>
              <td>{category.colour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
