import React from 'react';
import { Link } from "react-router-dom";

export default function HomeButton() {
    return (
        <Link className='btn btn-secondary' to='/'>Home</Link>
    );
}