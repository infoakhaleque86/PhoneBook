import React, { useEffect, useState } from "react";
import { getCategory } from "../api/getCategory";
import { useParams } from "react-router-dom";
import { TCategory } from "../typings";
import { FaUser } from "react-icons/fa";
import { updateTitle } from "../api/updateTitle";
import { addContact } from "../api/addContact";
import { deleteContact } from "../api/deleteContact";
import { editedContact } from "../api/updateContact";

export const Contact = () => {
  const [category, setCategory] = useState<TCategory>();
  const [title, setTitle] = useState("");

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");

  const { categoryId } = useParams();

  //////////////////////////////////////////////////////////////
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editId, setEditId] = useState("");

  // edit contact
  const [isEditing, setIsEditing] = useState(false);

  const fetchCategory = async () => {
    const category = await getCategory(categoryId!);
    setCategory(category);
  };

  // Toggle edit mode
  const toggleEdit = (
    id: string,
    name: string,
    description: string,
    number: string
  ) => {
    setIsEditing(!isEditing);
    setEditId(id);
    setEditName(name);
    setEditDescription(description);
    setEditNumber(number);
  };

  const handleEditContact = async () => {
    console.log({
      id: editId,
      name: editName,
      description: editDescription,
      number: editNumber,
    });
    await editedContact(
      categoryId,
      editId,
      editName,
      editDescription,
      editNumber
    ).then((r: unknown) => {
      fetchCategory();
      setIsEditing(false);
      console.log(r);
    });
  };

  //////////////////////////////////////////////

  // update title
  const handleUpdateTitle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return alert("No such category");
    const newTitle = await updateTitle(title, categoryId);
    setCategory(newTitle);
    setTitle("");
  };

  // Add contact
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) return alert("No such category");
    const newCategory = await addContact(categoryId, name, description, number);
    setCategory(newCategory);
    setName("");
    setDescription("");
    setNumber("");
  };

  // delete contact
  const handleDeleteContact = async (contactId: string) => {
    if (!categoryId) return;
    const deletedConatct = await deleteContact(categoryId, contactId);
    setCategory(deletedConatct);
  };

  useEffect(() => {
    
    fetchCategory();
  }, [categoryId]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-center">
      <div className="border p-2 text-white mt-10 flex flex-col space-y-2">
        <h1 className="font-bold text-2xl capitalize text-center">
          {category?.category}
        </h1>
        {/* inputs for changing the title */}
        <div className="flex items-center ">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            placeholder="Change Title"
            className="inputs flex-1 "
          />
          <button onClick={handleUpdateTitle} className="btn">
            Change Title
          </button>
        </div>
      </div>

      {/* contacts */}
      <div className=" mt-10 flex flex-col space-y-2">
        <form onSubmit={handleAddContact} className="flex flex-col  space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Enter the contact name"
              className="inputs border nomargin"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter phone number"
              className="inputs border nomargin"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Enter description"
            className="inputs border nomargin"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button disabled={!name || !number} className="btn my-5 col-span-2">
            Add
          </button>
        </form>

        {/* contact info */}
        <div className="p-4">
          <div className="flex justify-between text-yellow-500 p-5 border-b-2 first:border-t-2">
            <p className="capitalize w-32 ml-10">Contact name</p>
            <p className="flex-1 ml-4">Description </p>
            <p className="flex-1 -ml-32">Phone Number</p>
          </div>
          <div>
            {category?.contacts.map((contact) => (
              <div
                key={category._id}
                className="flex justify-between text-yellow-500 p-5 border-b-2 first:border-t-2 space-x-3 gap-2"
              >
                <FaUser size={30} />

                {isEditing && contact._id === editId ? (
                  <input
                    type="text"
                    name="name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="capitalize w-32 mx-3 ml-6 border p-1 rounded-lg"
                  />
                ) : (
                  <h1 className="capitalize w-32 mx-3 ml-6">{contact.name}</h1>
                )}

                {isEditing && contact._id === editId ? (
                  <input
                    type="text"
                    name="description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="flex-1 border p-1 rounded-lg"
                  />
                ) : (
                  <p className="flex-1">{contact.description}</p>
                )}

                {isEditing && contact._id === editId ? (
                  <input
                    type="text"
                    name="number"
                    value={editNumber}
                    onChange={(e) => setEditNumber(e.target.value)}
                    className="flex-1 border p-1 rounded-lg"
                  />
                ) : (
                  <p className="flex-1">{contact.number}</p>
                )}

                {/* <h1 className="capitalize w-32 mx-3 ml-6">{contact.name}</h1> */}
                {/* <p className="flex-1">{contact.description}</p> */}
                {/* <p className="flex-1">{contact.number}</p> */}

                {isEditing && contact._id === editId ? (
                  <button className="btn" onClick={() => handleEditContact()}>
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      toggleEdit(
                        contact._id,
                        contact.name,
                        contact.description,
                        contact.number
                      )
                    }
                    className="btn"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteContact(contact._id)}
                  className="px-2 bg-red-500 rounded-lg text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
