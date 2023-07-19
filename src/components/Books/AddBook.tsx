/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import "./AddBook.css";
import { getToken } from "../../redux/features/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { usePostBookMutation } from "../../redux/api/productapislice";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [PublicationDate, setPublicationDate] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [postBook, options] = usePostBookMutation();
  console.log(options);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      author,
      genre,
      PublicationDate,
      img,
      userEmail,
    };
    const response = await postBook(data);
    console.log(response);
    toast.success("Book created successfully");
    navigate("/all-books");
    // Clear form fields
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationDate("");
    setImg("");
  };

  return (
    <div>
      <div className="bookInput p-7">
        <div className="userinfo">User: {getToken() ? userEmail : ""}</div>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label>Title:</label>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Image Link:</label> <br />
            <input value={img} onChange={(e) => setImg(e.target.value)} />
          </div>
          <div>
            <label>Author:</label> <br />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label>Genre:</label> <br />
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div>
            <label>Publication Date:</label> <br />
            <input
              type="text"
              value={PublicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
            />
          </div>
          <button type="submit" className="addbookbtn">
            Create
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddBook;
