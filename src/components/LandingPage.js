import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>
            <style>{`
                .landing-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: linear-gradient(to right, #e3f2fd, #ffffff);
                    padding: 1rem;
                    overflow: hidden;
                }

                .landing-content {
                    background-color: #ffffff;
                    padding: 3rem;
                    border-radius: 1rem;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                    max-width: 700px;
                    text-align: center;
                    animation: fadeIn 1s ease-in-out;
                    font-family: 'Inter', sans-serif;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .register-phrase {
                    font-size: 1.1rem;
                    font-weight: 500;
                    margin-top: 2rem;
                }

                .register-link {
                    color: #007bff;
                    text-decoration: none;
                    font-weight: 600;
                    transition: color 0.3s ease;
                }

                .register-link:hover {
                    color: #0056b3;
                    text-decoration: underline;
                }
            `}</style>

            <div className="landing-wrapper">
                <div className="jumbotron landing-content">
                    <h1 className="display-4 text-primary fw-bold">Welcome to CollabTool</h1>
                    <p className="lead mt-3 text-muted">
                        CollabTool empowers you to collaborate in real-time with ease and efficiency. Whether you're brainstorming, editing documents, or sharing ideas, our platform keeps your team connected and in sync—anytime, anywhere.
                    </p>
                    <hr className="my-4" />
                    <p className="text-secondary">
                        From managing team projects to capturing your personal thoughts, CollabTool brings you the tools you need to stay organized, focused, and productive—all in one powerful workspace.
                    </p>
                    <div className="register-phrase">
                        <Link to="/register" className="register-link">Register</Link> now for seamless experience
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
