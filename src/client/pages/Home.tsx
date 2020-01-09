import React from 'react';
import { NavLink } from 'react-router-dom';

import Layout from '../components/Layout';

const Home: React.FC = () => {
    return (
        <Layout>
            <h1>Homepage</h1>
            <NavLink to="/dashboard">Dashboard</NavLink>
        </Layout>
    );
};

export default Home;