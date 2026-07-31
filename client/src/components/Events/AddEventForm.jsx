import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { addEvent } from "../../services/EventService";
import { PlusIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import DateTimePicker from "./DateTimePicker";

function AddEventForm({events, setEvents, ...props}) {
  const { jobs, setJobs } = useOutletContext();
  const [ jobId, setJobId ] = useState("")
  const [open, setOpen] = useState(false)
  const [eventData, setEventData] = useState({
    event_title: "",
    scheduled_time: new Date(),
    notes: "",
  })

  async function handleSubmit(e) {
    e.preventDefault();
    const newEventData = {
      event: eventData.event_title,
      scheduled_time: eventData.scheduled_time,
      notes: eventData.notes,
      job_id: jobId
    }
    let newEvent = await addEvent(newEventData);
    if (newEvent) {
      setEvents(jobs =>[...jobs, newEvent])
    }
    setEventData({
      event_title: "",
      scheduled_time: new Date(),
      notes: "",      
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
          {<PlusIcon className="w-6 h-6"/>}{<CalendarDaysIcon className="w-6 h-6"/>}
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
              <h2 className="text-xl font-semibold">New Event:</h2>
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
                <option value="">Select Job</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="(Assessment, Interview, Job Offer Discussion...)"
                value={eventData.event_title}
                onChange={(e) => setEventData({...eventData, event_title: e.target.value})}
                className="border p-2 rounded"
                required
              />
              <DateTimePicker
                value={eventData.scheduled_time} 
                onChange={(dt) => setEventData({ ...eventData, scheduled_time: dt})}
              />
              <textarea
                placeholder="Important notes about the upcoming event..."
                value={eventData.notes}
                onChange={(e) => setEventData({...eventData, notes: e.target.value})}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add New Event
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddEventForm;