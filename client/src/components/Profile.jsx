import { useState, useEffect } from "react";

function Profile() {
  const [userData, setUserData] = useState({});
  const [tempData, setTempData] = useState({});
  const [editing, setEditing] = useState(false);

  // Fetch the user data from the API on load
  useEffect(() => {
    const getUserData = async () => {
      try {
        // Fetch the user data from the API
        const response = await fetch(
          `https://jellyfish-app-g2qxa.ondigitalocean.app/api/users`, {
            credentials: 'include',
          }
        );
        if (response.ok) {
          // Convert the response to JSON
          const data = await response.json();

          // Save the user data to state
          setUserData(data);
          setTempData(data);
        } else {
          console.error("Something went wrong!");
        }
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    getUserData();
  }, []);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Save the data to the API
      const response = await fetch(
        `https://jellyfish-app-g2qxa.ondigitalocean.app/api/users`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            credentials: 'include',
          },
          body: JSON.stringify(tempData),
        }
      );

      if (response.ok) {
        // Convert the response to JSON
        const data = await response.json();

        // Update the user data
        setUserData(data);
        setEditing(false);
      } else {
        console.error("Something went wrong!", response.statusText);
      }
    } catch (error) {
      console.error(`Error updating data: ${error}`);
    }
  };

  return (
    <div>
      <img src={userData.profilePicture} alt="Profile Picture" />
      <div>ID: {userData.userId}</div>
      <div>Email: {userData.email}</div>
      <div>
        {editing ? (
          <input
            value={tempData.name}
            onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
          />
        ) : (
          userData.name
        )}
      </div>
      <div>
        {editing ? (
          <textarea
            value={tempData.bio}
            onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
          />
        ) : (
          userData.bio
        )}
      </div>
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
}

export default Profile;
