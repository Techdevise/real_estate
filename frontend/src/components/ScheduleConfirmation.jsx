// src/components/ScheduleConfirmation.jsx
import React, { useState, useEffect } from "react";
import Layout from "../layout/Index";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ScheduleConfirmation = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]); // all bookings

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bookings`);
        if (res.data.success) {
          setBookedSlots(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  // Get booked slots for selected date
  const getBookedSlotsForDate = (date = selectedDate) => {
    const dateStr = date.toISOString().split("T")[0];
    return bookedSlots
      .filter((b) => b.date === dateStr)
      .map((b) => b.slots);
  };

  // Disable fully booked dates in calendar
  const isDateFullyBooked = (date) => {
    const bookedForDate = getBookedSlotsForDate(date);
    return bookedForDate.length >= timeSlots.length;
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("user_id");
    const dateStr = selectedDate.toISOString().split("T")[0];
    const blockedSlots = getBookedSlotsForDate();

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User not found",
        text: "Please fill user details first.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (!selectedTime) {
      Swal.fire({
        icon: "warning",
        title: "Please select a time slot!",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (blockedSlots.includes(selectedTime)) {
      Swal.fire({
        icon: "error",
        title: "Slot Already Booked",
        text: `The slot ${selectedTime} is already taken on ${dateStr}.`,
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/add/bookings`, {
        user_id: userId,
        date: dateStr,
        slots: selectedTime,
      });

      Swal.fire({
        icon: "success",
        title: "Scheduled Successfully!",
        text: `Your appointment is set for ${selectedDate.toDateString()} at ${selectedTime}.`,
        confirmButtonColor: "#28a745",
        confirmButtonText: "Done",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#d33",
      });
    }
  };

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const bookedToday = getBookedSlotsForDate();

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
                  minDate={new Date()}
                  filterDate={(date) => !isDateFullyBooked(date)} // disable fully booked dates
                />
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center text-sm mb-4">
            {timeSlots.map((time, i) => {
              const isBooked = bookedToday.includes(time);
              return (
                <button
                  key={i}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-md transition duration-300 ${
                    isBooked
                      ? "bg-red-400 text-white cursor-not-allowed" // 🔴 highlight booked
                      : selectedTime === time
                      ? "bg-green-600 text-white" // 🟢 selected
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {time} {isBooked && "(Booked)"}
                </button>
              );
            })}
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
