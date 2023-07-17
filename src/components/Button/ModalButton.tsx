import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import icon from "../../edit.png";
import { IBook } from "../../types/globalTypes";
import { useEditBookMutation } from "../../redux/api/productapislice";
import { toast } from "react-toastify";

interface EditBookProps {
  book: IBook;
}

export default function MoadlButton({ book }: EditBookProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [updatedBook, setUpdatedBook] = useState<IBook>(
    book || {
      title: "",
      author: "",
      genre: "",
      PublicationDate: "",
    }
  );
  const [editBook, { isLoading }] = useEditBookMutation();
  const handleEditBook = async () => {
    try {
      const response = await editBook({ data: updatedBook });
      console.log("Book updated successfully:", response);
      toast("Book Updated Successfully");
      // Handle success logic or close the modal
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error logic
      toast("Failed to update");
    }
  };

  // Handle input changes to update the book object
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <button onClick={handleOpen}>
        <img src={icon} className="w-5" />
      </button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-5 grid h-20 place-items-center"
          >
            <Typography variant="h3" color="white">
              Edit Book
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Title"
              size="lg"
              type="text"
              name="title"
              value={updatedBook.title}
              onChange={handleInputChange}
            />
            <Input
              label="Author"
              size="lg"
              type="text"
              name="author"
              value={updatedBook.author}
              onChange={handleInputChange}
            />
            <Input
              label="Genre"
              size="lg"
              type="text"
              name="genre"
              value={updatedBook.genre}
              onChange={handleInputChange}
            />
            <Input
              label="Publication Date"
              size="lg"
              type="text"
              name="PublicationDate"
              value={updatedBook.PublicationDate}
              onChange={handleInputChange}
            />
          </CardBody>
          <CardFooter className="pt-0 flex gap-2">
            <Button variant="gradient" onClick={() => handleEditBook}>
              {isLoading ? "Updating..." : "Update Book"}
            </Button>

            <Button onClick={handleOpen}>Cancel</Button>
          </CardFooter>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}
