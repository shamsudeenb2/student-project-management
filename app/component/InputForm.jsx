
import styles from "@/app/ui/admin/student/addStudent/addstudent.module.css";
// type InputFieldProps = {
//   label: string;
//   type?: string;
//   register: any;
//   name: string;
//   defaultValue?: string;
//   error?: FieldError;
//   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
// };

const InputField = ({
  label,
  type = "text",
  handleOnChange,
  name,
  required,
  value,
  inputProps,
}) => {
  return (
    <div className={styles.feildsInput}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleOnChange}
        className={styles.inputField}
      />
    </div>
  );
};

export default InputField;
