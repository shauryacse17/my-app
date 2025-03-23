import React from 'react';

const DocumentDetails = () => {
    const document = JSON.parse(localStorage.getItem('document'));

    return (
        <div style={styles.container}>
            <h2>{document ? document.title : 'Document Not Found'}</h2>
            <p>{document ? document.content : 'No content available.'}</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '2rem',
    },
};

export default DocumentDetails;