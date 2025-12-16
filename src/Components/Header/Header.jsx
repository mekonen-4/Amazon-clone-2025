import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LowerHeader from './LowerHeader';
import amazonLogo from "../../assets/logo-icons/amazon-logo.png";
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BiCart } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import classes from './Header.module.css';
import { DataContext } from '../DataProvider/DataProvider';
const Header = () => {
const [state]=useContext(DataContext);
// console.log(state);

    return (
      <div className={`${classes.both_header_container}`}>
        <header className={classes.header_container}>
          <section className={classes.header_main_section}>
            <div className={classes.header_left_container}>
              {/* logo */}

              <Link className={classes.logo} to="/">
                <img src={amazonLogo} alt="Amazon Logo" />
              </Link>

              {/* delivery info */}
              <div className={classes.delivery}>
                <div>
                  <CiLocationOn size={25} />
                </div>
                <div>
                  <p>Delivered to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>
            {/* search  */}
            <div className={classes.header_middle_container}>
              <select>
                <option value="">All</option>
              </select>
              <input placeholder="Search Amazon" type="text" />
              <span className={classes.search_icon}>
                <FaSearch />
              </span>
            </div>
          </section>
          <div className={classes.header_right_container}>
            <div className={classes.language_selection}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png"
                alt=""
              />
              <IoIosArrowDown />
              <select name="" id="">
                <option value="">En</option>
              </select>
            </div>
            <Link to="/auth">
              <p>sign in</p>
              <span>Account & Lists</span>
            </Link>
            <Link to="/orders">
              <p>Returns </p>
              <span>& Orders</span>
            </Link>
            <Link to='/cart'>
              <div className={classes.cart}>
                <BiCart size={30} />

                <span>{state.cart.length}</span>
              </div>
            </Link>
          </div>
        </header>
        <LowerHeader />
      </div>
    );
}

export default Header;
