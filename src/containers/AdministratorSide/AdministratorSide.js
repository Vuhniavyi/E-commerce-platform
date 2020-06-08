import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import { fetchCategoriesActions } from '../../store/actions/categoriesActions';

const AdministratorSide = ({ children, fetchCategories }) => {
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <div className="admin-side wrap">
      <NavBar />
      <div className="container content-container">
        <Header />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategoriesActions()),
});

export default connect(null, mapDispatchToProps)(AdministratorSide);
