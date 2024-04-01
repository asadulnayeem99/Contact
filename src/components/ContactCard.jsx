/* eslint-disable react/prop-types */
import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import useDisclouse from "../hooks/useDisclouse";
import AddAndUpdateContact from "./AddAndUpdateContact";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="items-center flex mt-4 justify-around p-2 rounded-lg bg-yellow"
      >
        <div className="flex items-center gap-2">
          <HiOutlineUserCircle className="text-3xl text-orange" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email} </p>
          </div>
        </div>

        <div className="flex gap-2 text-3xl ">
          <RiEditCircleLine className="cursor-pointer" onClick={onOpen} />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default ContactCard;
