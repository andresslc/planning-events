'use client';

import { useState } from "react";

const BookEvent = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior to avoid page refresh
        
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    }

  return (
    <div id="book-event">
        {submitted ? (
            <p>Thank you for booking your spot! We will send you an email confirmation shortly.</p>
        ) : (
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
                <button type="submit" className="button-submit">Submit</button>
            </form>
        )}
    </div>

  )
}

export default BookEvent