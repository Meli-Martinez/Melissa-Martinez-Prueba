import React from "react";

type InputProps = {
  id?: string,
  className?: string,
  type?: string,
  name?: string,
  placeholder?: string,
  error: string | undefined,
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ id, className, type, name, placeholder, error, ...restProps }, ref) => {
  return (
    <>
      {error ? <p className="text-red-600 pt-1">{error}</p> : null}
      <input
        id={id}
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        {...restProps}
        ref={ref}
      />
    </>
  );
});

export {Input};