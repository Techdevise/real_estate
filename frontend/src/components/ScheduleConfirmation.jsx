// src/components/ScheduleConfirmation.jsx
import React, { useState } from 'react';
import Layout from '../layout/Index';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleConfirmation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("14:00");

const handleSubmit = () => {
  if (!selectedTime) {
    Swal.fire({
      icon: 'warning',
      title: 'Please select a time slot!',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Scheduled Successfully!',
    text: `Your appointment is set for ${selectedDate.toDateString()} at ${selectedTime}. Please check your email for confirmation.`,
    confirmButtonColor: '#28a745',
    confirmButtonText: 'Done',
  }).then((result) => {
    if (result.isConfirmed) {
      // Navigate away ONLY when user clicks "Done"
      window.location.href = '/';
    }
  });
};



  const timeSlots = [
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00"
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        {/* Schedule Now Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-xl font-bold text-center mb-8">Schedule Now</h2>
          
          {/* Calendar View */}
          <div className="flex justify-center mb-4">
            <div className="rounded-lg w-full flex justify-center p-6">
              <div className="scale-130"> 
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                />
              </div>
            </div>
          </div>
          
          {/* Time Slots */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center text-sm mb-4">
            {timeSlots.map((time, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(time)}
                className={`py-2 rounded-md transition duration-300 ${
                  selectedTime === time
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleConfirmation;
