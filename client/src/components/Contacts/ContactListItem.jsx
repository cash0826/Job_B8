import { deleteContact } from "../../services/ContactService";

function ContactListItem({ contact, setContacts }) {
  async function handleDelete() {
    try {
      await deleteContact(contact.id);
      setContacts(prev => prev.filter(c => c.id !== contact.id));
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  }

  return (
    <div className="grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-5 
      gap-2 p-2
      border-b border-gray-200 
      hover:bg-gray-50 
      items-center 
      ">
      <span className="font-semibold text-gray-800">{contact.name}</span>
      <span className="text-sky-800 break-all">{contact.email}</span>
      <span className="font-semibold text-gray-800">{contact.job.company}</span>
      <span className="text-gray-800">{contact.phone_number}</span>

      <button
        onClick={handleDelete}
        className="text-gray-500 hover:text-gray-800 underline font-bold text-right cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}

export default ContactListItem;
