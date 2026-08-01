import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { addContact } from "../../services/ContactService";
import { UserPlusIcon } from "@heroicons/react/24/solid";

function AddContactForm({contact, setContacts, ...props}) {
  const { jobs, setJobs } = useOutletContext();
  const [ jobId, setJobId ] = useState("")
  const [open, setOpen] = useState(false)
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  async function handleSubmit(e) {
    e.preventDefault();
    const newContactData = {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      job_id: jobId
    }
    let newContact = await addContact(newContactData);
    if (newContact) {
      setContacts(contacts =>[...contacts, newContact])
    }
    setContactData({
      name: "",
      email: "",
      phone: "",      
    })
    setOpen(false)
  }

  return (
    <>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex justify-center items-center w-full p-3
            cursor-pointer rounded-md 
            bg-white border border-gray-300 hover:bg-sky-100"
        >
          {<UserPlusIcon className="w-6 h-6"/>}
        </button>
      )}

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setOpen(false)}      
        >

          {/* Modal Content */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Contact:</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <select
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Job Company</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.company}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Recruiter's Name"
                value={contactData.name}
                onChange={(e) => setContactData({...contactData, name: e.target.value})}
                className="border p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email to reach"
                value={contactData.email}
                onChange={(e) => setContactData({...contactData, email: e.target.value})}
                className="border p-2 rounded"
                required
              />
              <input
                type="tel"
                placeholder="+1 123-456-5678"
                value={contactData.phone}
                onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add New Contact
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddContactForm;