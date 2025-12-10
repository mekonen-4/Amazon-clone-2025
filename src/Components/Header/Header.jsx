import React from 'react';
import LowerHeader from './LowerHeader';
import amazonLogo from "../../assets/logo-icons/amazon-logo.png";
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BiCart } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import classes from './Header.module.css';
const Header = () => {
    return (
      <>
        <header className={classes.header_container}>
          <section className={classes.header_main_section}>
            <div className={classes.header_left_container}>
              {/* logo */}

              <a className={classes.logo} href="">
                <img src={amazonLogo} alt="Amazon Logo" />
              </a>

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
                <option value="">
                  En
                </option>
              </select>
            </div>
            <a href="">
              <p>sign in</p>
              <span>Account & Lists</span>
            </a>
            <a href="">
              <p>Returns </p>
              <span>& Orders</span>
            </a>
            <div className={classes.cart}>
              <BiCart size={30} />

              <span>0</span>
            </div>
          </div>
        </header>
        <LowerHeader />
      </>
    );
}

export default Header;
