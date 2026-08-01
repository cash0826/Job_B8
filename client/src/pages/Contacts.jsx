import { useState, useEffect } from 'react';
import { loadContacts } from "../services/ContactService";
import AddContactForm from "../components/Contacts/AddContactForm";
import ContactListItem from "../components/Contacts/ContactListItem";

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
    <div className="space-y-6 mx-auto px-4">
      <div className="bg-white shadow-sm rounded-lg p-3">
        {contacts.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            setContacts={setContacts}
          />
        ))}
      </div>
      
      <div>
        <AddContactForm contacts={contacts} setContacts={setContacts}/>
      </div>
    </div>
  )
}

export default Contacts;