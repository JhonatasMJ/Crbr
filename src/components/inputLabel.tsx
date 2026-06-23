import { useId, type InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
}

export function InputLabel({ label, type, id, ...props }: InputLabelProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <Field className="gap-2">
      <FieldLabel htmlFor={inputId} className="text-sm font-bold text-white">
        {label}
      </FieldLabel>
      <Input id={inputId} type={type} {...props} />
    </Field>
  );
}
