import { checkIfLoggedIn } from "../auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  click,
  icon,
  label,
  type = "button",
  secondary,
  profile,
  className = "",
  ...props
}) => {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      const fetchUser = async () => {
        try {
          const { ok, user } = await checkIfLoggedIn();
          if (ok && user) {
            setMember(user);
          }
        } catch {
          navigate("/login");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [profile, navigate]);

  return (
    <button
      onClick={click}
      type={type}
      className={`flex justify-center items-center gap-2 p-3 text-sm rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${
                  secondary
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }
                ${type === "submit" ? "px-6 mx-auto w-full" : ""}
                ${
                  props.disabled || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } ${className}`}
      {...props}>
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
      ) : (
        <>
          {icon && !profile && <span className="mr-2">{icon}</span>}
          {profile && !icon && member && (
            <div className="relative w-8 h-8 rounded-full flex justify-center items-center overflow-hidden">
              <div className="w-full h-full bg-gray-200">
                <img src={member?.profilePicture} alt="User Profile Picture" />
              </div>
            </div>
          )}
          {label}
        </>
      )}
    </button>
  );
};

export default Button;
