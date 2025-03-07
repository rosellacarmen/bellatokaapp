import React from 'react';
import StrainCard from '../components/StrainCard';
import Stats from '../components/Stats';
import Nutrients from '../components/Nutrients';
import PestManagement from '../components/PestManagement';

const StrainPage = ({ strain }) => {
    return (
        <div>
            <StrainCard strain={strain} />
            <Stats strain={strain} />
            <Nutrients strain={strain} />
            <PestManagement strain={strain} />
        </div>
    );
};

export default StrainPage;