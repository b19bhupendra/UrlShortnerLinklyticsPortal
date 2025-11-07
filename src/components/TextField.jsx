const TextField = ({
    label,
    id,
    type,
    errors,//object containing validation errors from react hook form and it displays error messages if validation fails
    register,// function from react hook form to manage field validation and link it with form state
    required,
    message,
    className,
    min,
    value,
    placeholder,
  }) => {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id} // its is connecting label to input field for accessibility
          className={`${className ? className : ""} font-semibold text-md  `}
        >
          {label} 
        </label> 
  
        <input 
          type={type}
          id={id}
          placeholder={placeholder} // type, id, and placeholder attributes for the input field all of these were passed as props to the component
          className={`${
            className ? className : ""
          } px-2 py-2 border   outline-none bg-transparent  text-slate-700 rounded-md ${
            errors[id]?.message ? "border-red-500" : "border-slate-600"
          }`}
          {...register(id, {  // registering the input field with react hook form for validation
            required: { value: required, message }, // validation rules for the input field
            minLength: min
              ? { value: min, message: "Minimum 6 character is required" }
              : null,
  
            pattern: // conditional pattern validation based on the input type
              type === "email" // if type is email, apply email regex pattern
                ? {
                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                    message: "Invalid email",
                  }
                : type === "url" // if type is url, apply url regex pattern
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid url",
                  }
                : null,
          })}
        />
  
        {errors[id]?.message && (
          <p className="text-sm font-semibold text-red-600 mt-0">
            {errors[id]?.message}*
          </p>
        )}
      </div>
    );
  };
  
  export default TextField;