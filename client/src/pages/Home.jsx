import React from 'react';

export default function Home() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
        Welcome to my ConnectVerse!
      </h1>
      <p className='mb-4 text-slate-700'>
        This is a full-stack web application built with the MERN (MongoDB,
        Express, React, Node.js) stack. It includes authentication features that
        allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users.
      </p>
      <p className='mb-4 text-slate-700'>
      The front-end of the application is built with React and uses React Router for client-side routing. The back-end is built with Node.js and Express, and uses MongoDB as the database. Authentication is implemented using JSON Web Tokens (JWT), which includes an access token and a refresh token mechanism. The access token is a short-lived token that grants access to protected routes, while the refresh token, which has a longer expiration time, is used to obtain a new access token when the original access token expires. This setup enhances security and user experience by allowing users to stay authenticated without needing to log in frequently
      </p>
      <p className='mb-4 text-slate-700'>
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack. Feel free to
        use it as a template for your own projects!
      </p>
    </div>
  );
}
