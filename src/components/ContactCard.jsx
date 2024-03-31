/* eslint-disable react/prop-types */
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";

const ContactCard = ({ contact }) => {
  return (
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
        <RiEditCircleLine />
        <IoMdTrash className="text-orange" />
      </div>
    </div>
  );
};

export default ContactCard;
