import React, { useEffect } from "react";
import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const onNotificationClick = (notification) =>
        navigate(notification.cta.data.url);

    const signOut = () => {
        localStorage.removeItem("_id");
        navigate("/");
    };

    return (

        <nav className="navbar">
        <h2 className="navbar-title">Bookmate</h2>
        <div className="navbar-actions">
          <NovuProvider
            subscriberId={localStorage.getItem("_id")}
            applicationIdentifier="cRIH5PDlaw2Q"
          >
            <PopoverNotificationCenter
              onNotificationClick={onNotificationClick}
              colorScheme="light"
            >
              {({ unseenCount }) => (
                <NotificationBell unseenCount={unseenCount} />
              )}
            </PopoverNotificationCenter>
          </NovuProvider>
          <button className="sign-out-button" onClick={signOut}>Sign out</button>
        </div>
      </nav>
    );
};

export default Nav;
