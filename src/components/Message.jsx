import toast from "react-hot-toast";

const success = (message) => {
  toast.success(message || "Successfully toasted!");
};

const error = (message) => {
  toast.error(message || "Err");
};

const warning = () => {
  toast.warning("War");
};

export { success, error, warning };
