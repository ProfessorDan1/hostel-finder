"use client";

import { useState } from "react";

export default function PostApartment() {
  const [form, setForm] = useState({
    type: "",
    gender: "",
    location: "Otto/Ijanikin Campus",
    rent: "",
    phone: "",
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState("");

  const validate = () => {
    const newErrors: any = {};
    if (!form.type) newErrors.type = "Select hostel type.";
    if (!form.gender) newErrors.gender = "Select gender category.";
    // if (!/^(0\\d{10}|234\\d{10})$/.test(form.phone))
    //   newErrors.phone = "Enter a valid Nigerian phone number.";
    if (!form.name.trim()) newErrors.name = "Enter your name.";
    if (!form.rent || isNaN(Number(form.rent)))
      newErrors.rent = "Enter a valid rent amount.";
    // if (form.description.trim().length < 10)
    //   newErrors.description = "Description must be at least 10 characters.";
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "post-apartment" }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({
          type: "",
          gender: "",
          location: "Otto/Ijanikin Campus",
          rent: "",
          phone: "",
          name: "",
          description: "",
        });
      } else setStatus("error");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-lg mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
        Post an Apartment
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1">Type of Hostel</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option>Single Room</option>
            <option>Self Con</option>
            <option>Room and Parlor</option>
            <option>2 Bedroom</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option>Female Hostel</option>
            <option>Both Male and Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Annual Rent (₦)</label>
          <input
            name="rent"
            type="text"
            value={form.rent}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.rent && <p className="text-red-500 text-sm">{errors.rent}</p>}
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Other Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center mt-3">
            ✅ Form submitted successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-3">
            ❌ Something went wrong. Try again.
          </p>
        )}
      </form>
    </div>
  );
}
