import { useState, useEffect } from 'react';
import { loadContacts } from "../services/ContactService";
import ContactListItem from "../components/ContactListItem";

function Contacts() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    loadContacts()
      .then( (data) => setContacts(existing => data ) )
      .catch( (error) => console.log("Error retrieving contacts: ", error))
  }, []);  

  if (contacts.message) {
    return <p>{contacts.message}</p>
  }

  if (contacts.length === 0) {
    return <p>Loading Contacts...</p>
  }

  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
        />
      ))}
    </div>
  )
}

export default Contacts;