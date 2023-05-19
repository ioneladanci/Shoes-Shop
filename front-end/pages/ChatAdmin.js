import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import ChatRoom from "./ChatRoom";

export default function ChatAdmin() {
    return (

        <div className="container1">
            <NavbarAdmin />
            <ChatRoom/>
        </div>
    );

}