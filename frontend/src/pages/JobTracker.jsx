import React, { useState } from "react";

function JobTracker() {
  const jobData = {
    applied: [
      { title: "Senior iOS Engineer", company: "KAYAK" },
      { title: "Software Engineer", company: "Snapchat" },
      { title: "Full stack developer", company: "Linear" },
    ],
    interview: [
      { title: "Event Manager", company: "Bowlero" },
      { title: "Engineer", company: "Google" },
    ],
    shortlisted: [
      { title: "Product Manager", company: "Facebook" },
      { title: "Software Developer", company: "Microsoft" },
    ],
    rejected: [
      { title: "Software Engineer", company: "Amazon" },
      { title: "Data Analyst", company: "Netflix" },
    ],
  };

  const [showModal, setShowModal] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [company, setCompany] = useState("");

  const handleAddJob = () => {
    // Add the new job to the "applied" category
    const newJob = { title: jobRole, company: company };
    const updatedJobData = { ...jobData };
    updatedJobData.applied.push(newJob);
    // Update the jobData state
    setJobData(updatedJobData);
    // Close the modal
    setShowModal(false);
    // Reset the input fields
    setJobRole("");
    setCompany("");
  };

  return (
    <>
      <div className="m-10 bg-gray-100 p-4 w-full">
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
            {/* Mapping over the four sections: applied, interview, shortlisted, rejected */}
            {["applied", "interview", "shortlisted", "rejected"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h2 className="text-xl font-bold mb-4 capitalize">
                    {category}
                  </h2>
                  <div className="space-y-4">
                    {/* Mapping over jobs in the current category */}
                    {jobData[category].map((job, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-bold">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                        <span className="text-xs text-gray-500">1mo</span>
                      </div>
                    ))}
                    <button
                      className="w-full py-2 mt-4 text-purple-600 border-2 border-purple-600 rounded-lg"
                      onClick={() => setShowModal(true)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-xl font-bold mb-4">Add Job</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Job Role"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 m-2 w-full"
              />
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 m-2 w-full"
              />
              <button
                className="w-16 py-2 mt-4 text-purple-600 border-2 border-purple-600 rounded-lg m-2"
                onClick={handleAddJob}
              >
                Add
              </button>
              <button
                className="w-16 py-2 mt-2 text-red-600 border-2 border-red-600 rounded-lg m-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default JobTracker;
