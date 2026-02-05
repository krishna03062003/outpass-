import React, { useEffect, useRef, useState } from "react";
import api from "../api";
import html2pdf from "html2pdf.js";

const MessBillPage = () => {
  const [bills, setBills] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [ratePerDay, setRatePerDay] = useState("");
  const [water, setwater] = useState("");
  const [semfees, setsemfees] = useState("");
  const [elect, setelect] = useState("");
  const [serventsalary, setserventsalary] = useState("");
  const printRef = useRef();

  // Fetch bills
  const fetchBills = async () => {
    try {
      const res = await api.get("/admin/messbill", { withCredentials: true });
      setBills(res.data.bills);
      setDateRange(res.data.dateRange);
      setRatePerDay(res.data.ratePerDay);
      setwater(res.data.water);
      setserventsalary(res.data.serventsalary);
      
    } catch (err) {
      console.error("Failed to fetch mess bills", err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Print handler
  const handleDownloadPDF = () => {
    const element = printRef.current;
    const opt = {
      margin:       0.5,
      filename:     'Mess_Bills_Report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  // Submit rate & date range
  const handleRateSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        "/admin/messrate",
        {
            monthlyRate: ratePerDay,
          startDate: dateRange.from,
          endDate: dateRange.to,
          semfees:semfees,
          water:water,
          serventsalary:serventsalary,
          elect:elect

        },
        { withCredentials: true }
      );
      alert("Rate and date range set successfully!");
      fetchBills(); // Refresh
    } catch (err) {
      console.error("Failed to set mess rate", err);
      alert("Error setting rate");
    }
  };


  return (
    <div className="p-6 space-y-6 bg-slate-600">
              <h1 className=" text-center text-2xl">  Hostel Name </h1> 
      <h2 className="text-2xl font-bold text-center">Mess Bill Report</h2>

      {/* Set Rate Form */}
      <form
        onSubmit={handleRateSubmit}
        className="flex flex-wrap gap-4 items-end border border-gray-200 p-4 rounded-md bg-slate-400"
      >
        <div>
          <label className="block text-sm font-medium">From</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">To</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rate (₹/day)</label>
          <input
            type="number"
            value={ratePerDay}
            onChange={(e) => setRatePerDay(e.target.value)}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">water </label>
          <input
            type="number"
            value={water}
            onChange={(e) => setwater(e.target.value)}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">elect</label>
          <input
            type="number"
            value={elect}
            onChange={(e) => setelect(e.target.value)}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">semfees</label>
          <input
            type="number"
            value={semfees}
            onChange={(e) => setsemfees(e.target.value)}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">serventsalary</label>
          <input
            type="number"
            value={serventsalary}
            onChange={(e) => setserventsalary(e.target.value)}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Set Rate
        </button>
      </form>

      {/* Rate Info */}
      <div>
        <p>
          <strong>Date Range:</strong> {dateRange?.from} to {dateRange?.to}
        </p>
        <p>
          <strong>Rate Per Day:</strong> ₹{ratePerDay}
        </p>
      </div>

      {/* Print Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDownloadPDF}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
        >
          Download PDF
        </button>
      </div>

 

      {/* Table */}
      <div ref={printRef} className="border p-4 rounded-lg bg-white">
        <div className="bg-gray-500  py-3 px-2">
        <h1 className=" text-center text-2xl">  Hostel Name </h1> 
        <h1 className=" text-center text-xl"> Messbill </h1> 
        <h1 className=" text-center text-2xl"> {dateRange.from} to {dateRange.to} </h1> 
         </div>
     
  
        <table className="w-full table-auto border-collapse bg-gray-400">
          <thead>
            <tr className="bg-gray-400 text-left">
            <th className="border p-2">Name</th>
              <th className="border p-2">Roll Number</th>
              <th className="border p-2">Monthly Att</th>
              <th className="border p-2">Diet perday</th>
              <th className="border p-2">TotalMessing</th>
              <th className="border p-2">Elect.charges</th>
              <th className="border p-2">WaterCharges</th>
              <th className="border p-2">Serventsalary</th>
               <th className="border p-2">Total mess Bill (₹)</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index} className="border-t">
               <td className="border p-2">{bill.name}</td>
               <td className="border p-2">{bill.rollNumber}</td>
           
               <td className="border p-2">{bill.totalDaysPresent}</td>
               <td className="border p-2">{bill.monthlyRate}</td>
               <td className="border p-2">₹{bill.totalBill}</td>
               <td className="border p-2">{bill.elect}</td>
               <td className="border p-2">{bill.water}</td>
               <td className="border p-2">{bill.serventsalary}</td>
               <td className="border p-2">{bill.totalmessbill}</td>
         
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessBillPage;
