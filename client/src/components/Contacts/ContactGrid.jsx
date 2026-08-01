import ContactListItem from "./ContactListItem";

function ContactGrid({ contacts, setContacts, ...props}) {


  return (
    <div>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          setContacts={setContacts}
        />
      ))}
    </div>
  )
}

export default ContactGrid;