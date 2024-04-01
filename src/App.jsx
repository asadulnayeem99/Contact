// import React from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import ContactCard from "./components/ContactCard";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import { db } from "./config/firebase";
import useDisclouse from "./hooks/useDisclouse";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      const contactsRef = collection(db, "contacts");
      // const contactSnap = await getDocs(contactsRef);
      try {
        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);
      return filterContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Nav />
        <div className="flex">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="text-white font text-3xl absolute ml-1" />
            <input
              onChange={filterContacts}
              type="text"
              className="flex-grow h-10 bg-transparent border text-white border-white pl-9 rounded-md"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>
        <div>
          {contacts.length <= 0 ? (
            <NotFound />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
