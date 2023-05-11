import { useState } from "react";
import "./ProfilePage.css";

function ProfilePage() {
    return (
        <div className="profile-container">
          <div className="profile-header">
            <img
              className="profile-image"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <div className="profile-info">
              <h1 className="profile-name">John Doe</h1>
              <p className="profile-bio">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tristique aliquam libero vel euismod.
              </p>
            </div>
          </div>
          <div className="profile-details">
            <h2 className="profile-heading">Profile Details</h2>
            <ul className="profile-list">
              <li className="profile-item">
                <strong>Email:</strong> john.doe@example.com
              </li>
              <li className="profile-item">
                <strong>Phone:</strong> (123) 456-7890
              </li>
              <li className="profile-item">
                <strong>Address:</strong> 123 Main St, Anytown USA
              </li>
            </ul>
          </div>
        </div>
      );
    }

export default ProfilePage;