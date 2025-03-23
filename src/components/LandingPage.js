import React from 'react';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <h1>Welcome to MERN CollabTool</h1>
            <p>Collaborate and manage your documents seamlessly.</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '15rem',
    },
};

export default LandingPage;