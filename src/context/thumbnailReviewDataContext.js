import { createContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const ThumbnailDataContext = createContext({
  loginRequired: "",
  name: "",
  mainLoginEmail: "",
  email: "",
  profilePic: "",
  token: "",
  handleChange: () => {},
  handleToken: () => {},
  handleLoginRequired: () => {},
  handlemainLoginEmail: () => {},

  counsellorData: {},

  handleCounsellorData: () => {},
  formData: {},
  setFormData: () => {},
  handleFormData: () => {},
  handleApproved: () => {},
  handleReject: () => {},
});
export const ThumnbnailDataContextProvider = ({ children }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [token, setToken] = useState("");
  const [loginRequired, setLoginRequired] = useState(false);
  const [mainLoginEmail, setMainLoginEmail] = useState(
    localStorage.getItem(`formId${id}_mainEmail`)
  );

  let [counsellorData, setCounsellorData] = useState("dfsdf");

  let [formData, setFormData] = useState([]);
  console.log(counsellorData, " line 1dfsdfsdfdsf7");

  let handleFormData = (data) => {
    setFormData(data);
  };

  let handleCounsellorData = (data) => {
    setCounsellorData(data);
  };

  let handleReject = (item) => {
    let data = formData;
    const updatedArray = data.map((newitem) => {
      console.log(newitem, " line 33222222", item);
      if (newitem.id == item.id) {
        return {
          ...newitem, // Copy all existing key-value pairs
          localStatus: "REJECTED", // Modify the specific key with the desired new value
        };
      } else {
        return newitem;
      }
    });
    setFormData(updatedArray);
  };
  let handleApproved = (item) => {
    let data = formData;
    const updatedArray = data.map((newitem) => {
      if (newitem.id == item.id) {
        return {
          ...newitem, // Copy all existing key-value pairs
          localStatus: "APPROVED", // Modify the specific key with the desired new value
        };
      } else {
        return newitem;
      }
    });
    setFormData(updatedArray);
  };
  const handleChange = ({ name, email, profilePic }) => {
    if (name) setName(name);
    if (email) setEmail(email);
    if (profilePic) setProfilePic(profilePic);
  };
  const handlemainLoginEmail = (mail) => {
    setMainLoginEmail(mail);
  };
  const handleToken = (token) => {
    setToken(token);
  };

  const handleLoginRequired = (bool) => {
    setLoginRequired(bool);
  };
  return (
    <ThumbnailDataContext.Provider
      value={{
        name,
        mainLoginEmail,
        handlemainLoginEmail,
        email,
        profilePic,
        token,
        loginRequired,
        handleChange,
        handleToken,
        handleLoginRequired,
        counsellorData,
        handleCounsellorData,
        formData,
        setFormData,
        handleFormData,
        handleApproved,
        handleReject,
      }}
    >
      {children}
    </ThumbnailDataContext.Provider>
  );
};
