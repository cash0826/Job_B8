

function ContactListItem( { contact } ) {

  return (
    <div>
      <p>
        {contact.name}
        {contact.email}
      </p>
    </div>
  )
}

export default ContactListItem;