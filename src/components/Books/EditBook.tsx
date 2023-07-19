/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Input, Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../../redux/api/productapislice";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [PublicationDate, setPublicationDate] = useState("");
  const [img, setImg] = useState("");
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);
  const [updateBook, options] = useUpdateBookMutation();
  console.log(options);
  const userEmail = localStorage.getItem("userEmail");
  const isUserBookCreator = book?.data.userEmail === userEmail;

  const updateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUserBookCreator) {
      const formData = {
        title,
        author,
        genre,
        PublicationDate,
        img,
      };
      const response = await updateBook({ id: id, data: formData });
      toast.success("Book Updated Successfuly");
      console.log(response);
    } else {
      toast.error("You are not the author");
    }
  };
  return (
    <div>
      <h1 className="text-center mt-5 font-bold">
        Update Your Book Info <br />{" "}
        <span color="green">Book Name:{book?.data.title}</span> <br />
        <span>
          {" "}
          Author:
          {book?.data.author}
        </span>
      </h1>
      <div className="flex flex-col w-72 gap-7 m-auto">
        <form onSubmit={updateHandler}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="xl:w-15 "
            variant="outlined"
            label="Title"
          />
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="xl:w-15 "
            variant="outlined"
            label="Author"
          />
          <Input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="xl:w-15"
            variant="outlined"
            label="Genre"
          />
          <Input
            value={PublicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="xl:w-15"
            variant="outlined"
            label="Publication Date"
          />
          <Input
            onChange={(e) => setImg(e.target.value)}
            value={img}
            className="xl:w-15"
            variant="outlined"
            label="Image"
          />
          <Button color="green" className="mt-5" type="submit">
            Update
          </Button>
        </form>
      </div>
      <ToastContainer />;
    </div>
  );
};

export default EditBook;
