// import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import ContactCard from "./components/ContactCard";
import Nav from "./components/Nav";
import { db } from "./config/firebase";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactSnap = await getDocs(contactsRef);
        const contactList = contactSnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactList);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="max-w-[370px] mx-auto px-4">
      <Nav />
      <div className="flex">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="text-white font text-3xl absolute ml-1" />
          <input
            type="text"
            className="flex-grow h-10 bg-transparent border text-white border-white pl-9 rounded-md"
          />
        </div>
        <AiFillPlusCircle className="text-5xl text-white cursor-pointer" />
      </div>
      <div>
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default App;
