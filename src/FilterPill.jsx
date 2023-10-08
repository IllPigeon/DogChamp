import React from 'react';

const FilterPill = ({ breed, handleRemove }) => {

    const handleRemoveClick = () => {
        // Call the onRemove function with the breed when the pill is clicked
        handleRemove(breed);
    };

    return (
    <div className="filtered-pill" onClick={() => handleRemoveClick()}>
        {breed.toUpperCase()} X
    </div>
    );
};

export default FilterPill;