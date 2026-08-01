import { useState, useEffect } from 'react';
import { loadContacts } from "../services/ContactService";
import AddContactForm from "../components/Contacts/AddContactForm";
import ContactGrid from "../components/Contacts/ContactGrid";

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadContacts()
      .then(data => {
        setContacts(data || []) ;
        setLoading(false);
      })
      .catch(error => {
        console.error("Error retrieving contacts: ", error);
        setError("Uanble to load contacts.");
        setLoading(false)
      })
  }, []);  

  if (loading) return <p>Loading Contacts...</p>;
  if (error) return <p> {error} </p>;
  if (contacts.message) return <p> {contacts.message} </p>;

  return (
    <>
      <ContactGrid contacts={contacts} setContacts={setContacts}/>

      <div>
        <AddContactForm contacts={contacts} setContacts={setContacts}/>
      </div>
    </>
  )
}

export default Contacts;