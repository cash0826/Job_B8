

function ContactListItem( { contact } ) {

  return (
    <div className="relative group grid grid-cols-4 gap-4 border-b border-gray-200 hover:bg-gray-50">
        <span className="font-semibold text-gray-800 text-left">{contact.name}</span>
        <span className="font-normal text-sky-800 text-left">{contact.email}</span>
        <span className="font-semibold text-gray-800 text-left">{contact.job.company}</span>
        {contact.phone_number && <span>{contact.phone_number}</span>}
    </div>
  )
}

export default ContactListItem;