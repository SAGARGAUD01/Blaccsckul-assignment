const { useState } = React;

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleInputBlur = (field) => {
    const value = formData[field];
    let errorMessage = "";

    if (field === "firstName" || field === "lastName") {
      if (!/^[A-Za-z]+$/.test(value)) {
        errorMessage = "Invalid name";
      }
    } else if (field === "username") {
      if (!/^[A-Za-z0-9._]{5,30}$/.test(value)) {
        errorMessage = "Invalid username";
      }
    } else if (field === "password") {
      if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|?~]).{7,16}/.test(
          value
        )
      ) {
        errorMessage = "Invalid password";
      }
    }

    setValidationErrors({
      ...validationErrors,
      [field]: errorMessage
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    for (const field in formData) {
      if (!formData[field]) {
        hasErrors = true;
        setValidationErrors({
          ...validationErrors,
          [field]: "This field is required"
        });
      }
    }

    if (!hasErrors) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="gap-y-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center">SignUp</h1>
        <form onSubmit={handleSubmit}>
          <div className="gap-y-5 px-5 flex flex-col items-center">
            <div className="flex flex-row items-center justify-between">
              {["firstName", "lastName"].map((field) => (
                <div key={field} className="w-[40%] flex flex-col items-start">
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    style={{ border: "1px solid black", marginRight: "15px" }}
                    className="border-[1px] border-[#B7B7B7] rounded-full px-3 py-1 text-lg"
                    type="text"
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    onBlur={() => handleInputBlur(field)}
                  />
                  {validationErrors[field] && (
                    <p className="text-red-500">{validationErrors[field]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-between items-center">
              {["username", "password"].map((field) => (
                <div key={field} className="w-[49%] flex flex-col items-start">
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    style={{ border: "1px solid black", marginRight: "15px" }}
                    className="border-[1px] border-[#B7B7B7] rounded-full px-3 py-1 text-lg"
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    onBlur={() => handleInputBlur(field)}
                  />
                  {validationErrors[field] && (
                    <p className="text-red-500">{validationErrors[field]}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              style={{ border: "1px solid black" }}
              type="submit"
              className="border-[1px] border-[#B7B7B7] rounded-full px-3 py-1 text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
