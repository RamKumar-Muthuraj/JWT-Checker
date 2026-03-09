import React, { useRef, useState } from "react";

export default function Form({
  fields,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  direction,
  size,
  bgColor,
}) {
  const [errors, setErrors] = useState({});
  const focusRef = useRef(null);

  React.useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let errors = {};

    fields.forEach((field) => {
      if (
        field.required &&
        (!formData[field.name] || String(formData[field.name]).trim() === "")
      ) {
        errors[field.name] = `${field.label} is required`;
      } else if (field.match && !field.match.test(formData[field.name])) {
        errors[field.name] =
          `Invalid ${field.label} must be least 8 character, One uppercase, one lowercase, one number and one special character`;
      } else if (
        field.name === "confirmPassword" &&
        formData[field.name] !== formData["password"]
      ) {
        errors[field.name] = `Passwords do not match`;
      } else if (
        field.maxLength &&
        formData[field.name]?.length > field.maxLength
      ) {
        errors[field.name] =
          `${field.label} cannot exceed ${field.maxLength} characters`;
      } else if (
        field.min !== undefined && field.max !== undefined &&
        (formData[field.name] < field.min || formData[field.name] > field.max)
      ) {
        errors[field.name] =
          `${field.label} must be between ${field.min} and ${field.max}`; 
      }
    });

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`w-full ${size} mx-auto px-2`}>
      <form
        onSubmit={handleSubmit}
        className={`${bgColor} p-3 sm:p-4 space-y-6`}
      >
        <div className={`grid ${direction} gap-3 sm:gap-6`}>
          {fields.map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-(--text-primary-color)">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 text-(--text-primary-color) focus:border-cyan-500 outline-none transition"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  ref={idx == 0 ? focusRef : null}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  maxLength={field.maxLength}
                  min={field.min}
                  max={field.max}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  placeholder={`Enter your ${field.label}`}
                />
              )}

              {errors[field.name] && (
                <span className="mt-2 text-sm text-red-500">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-(--purple-color) hover:bg-(--text-secondary-color) text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
