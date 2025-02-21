import { useState } from "react";

const EditProfile = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || "",
    bannerPicture: user?.bannerPicture || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
      <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" />
      <input type="text" name="bannerPicture" value={formData.bannerPicture} onChange={handleChange} placeholder="Banner Picture URL" />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;
